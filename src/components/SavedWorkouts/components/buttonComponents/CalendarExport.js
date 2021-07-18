import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  NativeSelect,
} from "@material-ui/core";
import ICalendarLink from "react-icalendar-link";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Alert from "@material-ui/lab/Alert";

//Exports an ics file for the user
export default function ExportIcs(props) {
  const { firestoreData, originalHandleClose, workoutName } = props;

  //Dialog state
  const [form, setForm] = useState(false);

  //Default days chosen for weekly repeat to be monday
  const [daysChosen, setDaysChosen] = useState(["MO"]);

  //Default duration of workout 30min
  const [duration, setDuration] = useState(30);

  //State to store whether user wants to set weekly or a one time event. 0 = weekly 1 = once
  const [frequency, setFrequency] = useState(1);

  const [iCalTitle, setICalTitle] = useState({
    title: `${workoutName}`,
    description: `${firestoreData
      .map(
        (index) => `${index.sets} sets of ${index.reps} reps of ${index.title}`
      )
      .join("\\n")}`,
    startTime: "2021-07-07T10:30:00+08:00",
    endTime: "2021-07-09T12:00:00+08:00",
  });
  const [rawContent, setRawContent] = useState(``);

  //Gets selected start time and updates iCalTitle's start and end time and date
  const handleStartTimeChange = (date) => {
    //One time event
    if (frequency == 1) {
      //Updates start time
      var updatedSingleStartTime = new Date(iCalTitle.startTime);
      updatedSingleStartTime.setHours(date.getHours());
      updatedSingleStartTime.setMinutes(date.getMinutes());

      //Updates end time based on currently selected duration
      var updatedSingleEndTime = new Date(iCalTitle.endTime);
      updatedSingleEndTime.setHours(
        updatedSingleStartTime.getHours() + Math.floor(duration / 60)
      );
      updatedSingleEndTime.setMinutes(
        updatedSingleStartTime.getMinutes() + (duration % 60)
      );

      setICalTitle({
        ...iCalTitle,
        startTime: updatedSingleStartTime,
        endTime: updatedSingleEndTime,
      });
    }
    //Weekly event
    else {
      //Updates start time
      var updatedWeeklyStartTime = new Date();
      updatedWeeklyStartTime.setHours(date.getHours());
      updatedWeeklyStartTime.setMinutes(date.getMinutes());

      //Calculates start date based on chosen days
      const offset = getStartDate(daysChosen);
      updatedWeeklyStartTime.setDate(updatedWeeklyStartTime.getDate() + offset);

      //Updates end time
      var updatedSingleEndTime = new Date(updatedWeeklyStartTime);
      updatedSingleEndTime.setHours(
        updatedWeeklyStartTime.getHours() + Math.floor(duration / 60)
      );
      updatedSingleEndTime.setMinutes(
        updatedWeeklyStartTime.getMinutes() + (duration % 60)
      );
      setICalTitle({
        ...iCalTitle,
        startTime: updatedWeeklyStartTime,
        endTime: updatedSingleEndTime,
      });
    }
  };

  //For one time event, gets chosen date and updates iCalTitle's start and end date
  const handleSingleDateChange = (date) => {
    var updatedStartTime = new Date(iCalTitle.startTime);
    var updatedEndTime = new Date(iCalTitle.endTime);
    updatedStartTime.setDate(date.getDate());
    updatedEndTime.setDate(date.getDate());
    setICalTitle({
      ...iCalTitle,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
    });
  };

  //For weekly event, gets array of chosen days and updates iCalTitle's start and end date
  const handleWeeklyDateChange = (daysChosen) => {
    if (daysChosen.length) {
      //Updates start date
      var updatedStartTime = new Date(iCalTitle.startTime);
      var today = new Date();
      const offset = getStartDate(daysChosen);
      updatedStartTime.setDate(today.getDate() + offset);

      //Updates end time and date
      var updatedEndTime = new Date(updatedStartTime);
      updatedEndTime.setHours(
        updatedStartTime.getHours() + Math.floor(duration / 60)
      );
      updatedEndTime.setMinutes(
        updatedStartTime.getMinutes() + (duration % 60)
      );
      setICalTitle({
        ...iCalTitle,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
      });
    }
  };

  //When user changes duration of workout, updates iCalTitle's end time
  const handleEndTimeChange = (event) => {
    setDuration(event.target.value);
    var updatedTime = new Date(iCalTitle.startTime);
    updatedTime.setHours(
      updatedTime.getHours() + Math.floor(event.target.value / 60)
    );
    updatedTime.setMinutes(
      updatedTime.getMinutes() + (event.target.value % 60)
    );
    setICalTitle({ ...iCalTitle, endTime: updatedTime });
  };

  const handleRawContent = (event) => {
    if (frequency == 1) {
      setRawContent("");
    } else {
      if (event.length) {
        const str = event.join();
        setRawContent(`RRULE:FREQ=WEEKLY;BYDAY=${str};INTERVAL=1`);
      } else {
        setRawContent("");
      }
    }
  };

  const handleFrequency = (event) => {
    setFrequency(event.target.value);
  };

  const handledaysChosen = (event, newDaysChosen) => {
    setDaysChosen(newDaysChosen);
  };

  const handleClickOpen = () => {
    setForm(true);
  };

  const handleClose = () => {
    setForm(false);
  };

  //Whenever frequency changes, handleRawContent updates RawContent while handleWeeklyDateChange updates iCalTitle
  useEffect(() => {
    handleRawContent(daysChosen);
    handleWeeklyDateChange(daysChosen);
  }, [daysChosen, frequency]);

  //Calculates the offset in start date
  function getStartDate(selectedDays) {
    var today = new Date();
    var day = today.getDay();
    var offset = 0;
    while (!selectedDays.filter((x) => dayStringtoNumber(x) == day).length) {
      if (day == 6) {
        day = 0;
        offset += 1;
      } else {
        day += 1;
        offset += 1;
      }
    }
    return offset;
  }

  //getStartDate's helper function
  function dayStringtoNumber(day) {
    if (day == "MO") {
      return 1;
    }
    if (day == "TU") {
      return 2;
    }
    if (day == "WE") {
      return 3;
    }
    if (day == "TH") {
      return 4;
    }
    if (day == "FR") {
      return 5;
    }
    if (day == "SA") {
      return 6;
    }
    if (day == "SU") {
      return 0;
    }
  }

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>iCalendar File(.ics)</MenuItem>
      <Dialog
        open={form}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Export Workout as ICS</DialogTitle>
        <DialogContent>
          <DialogContentText>Frequency?</DialogContentText>
          <FormControl>
            <NativeSelect
              id="workout-frequency"
              value={frequency}
              onChange={handleFrequency}
            >
              <option value={1}>Once</option>
              <option value={0}>Weekly</option>
            </NativeSelect>
          </FormControl>
          {frequency == 0 && (
            <div>
              <br />
              <DialogContentText>
                Please select the days to have your workout
              </DialogContentText>

              {!window.mobileCheck() ? (
                <ToggleButtonGroup
                  value={daysChosen}
                  onChange={handledaysChosen}
                >
                  <ToggleButton value="MO">Mon</ToggleButton>
                  <ToggleButton value="TU">Tue</ToggleButton>
                  <ToggleButton value="WE">Wed</ToggleButton>
                  <ToggleButton value="TH">Thur</ToggleButton>
                  <ToggleButton value="FR">Fri</ToggleButton>
                  <ToggleButton value="SA">Sat</ToggleButton>
                  <ToggleButton value="SU">Sun</ToggleButton>
                </ToggleButtonGroup>
              ) : (
                <span>
                  <ToggleButtonGroup
                    value={daysChosen}
                    onChange={handledaysChosen}
                  >
                    <ToggleButton value="MO">Mon</ToggleButton>
                    <ToggleButton value="TU">Tue</ToggleButton>
                    <ToggleButton value="WE">Wed</ToggleButton>
                  </ToggleButtonGroup>
                  <ToggleButtonGroup
                    value={daysChosen}
                    onChange={handledaysChosen}
                  >
                    <ToggleButton value="TH">Thur</ToggleButton>
                    <ToggleButton value="FR">Fri</ToggleButton>
                    <ToggleButton value="SA">Sat</ToggleButton>
                    <ToggleButton value="SU">Sun</ToggleButton>
                  </ToggleButtonGroup>
                </span>
              )}
              {!daysChosen.length && (
                <Alert severity="error">Please choose at least one day!</Alert>
              )}
              <br />
              <br />
            </div>
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {frequency == 1 && (
              <div>
                <br />
                <DialogContentText>
                  Please select the date for your workout
                </DialogContentText>
                <KeyboardDatePicker
                  id="date-picker"
                  format="MM/dd/yyyy"
                  value={iCalTitle.startTime}
                  onChange={handleSingleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <br />
                <br />
              </div>
            )}
            <DialogContentText>
              Please select the start time of your workout
            </DialogContentText>
            <KeyboardTimePicker
              id="start-time-picker"
              disabled={!daysChosen.length}
              value={iCalTitle.startTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
          <br />
          <br />
          <DialogContentText>Select duration of workout</DialogContentText>
          <FormControl>
            <NativeSelect
              id="Endtime"
              value={duration}
              onChange={handleEndTimeChange}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={75}>1 hour 15 minutes</option>
              <option value={90}>1 hour 30 minutes</option>
              <option value={105}>1 hour 45 minutes</option>
              <option value={120}>2 hours</option>
            </NativeSelect>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={frequency == 0 && !daysChosen.length}
            onClick={originalHandleClose}
            color="primary"
          >
            <ICalendarLink
              style={{
                textDecoration: "inherit",
                color: "inherit",
              }}
              event={iCalTitle}
              rawContent={frequency == 0 ? rawContent : ""}
            >
              Add to Calendar
            </ICalendarLink>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
