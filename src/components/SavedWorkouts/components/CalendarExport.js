import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormHelperText,
  FormLabel,
  FormControlLabel,
  MenuItem,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
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

//firestoredata is the curated exercises + sets + reps
export default function ExportIcs(props) {
  const { firestoreData } = props;
  const [form, setForm] = useState(false);
  const [iCalTitle, setICalTitle] = useState({
    title: "Workout",
    description: `${firestoreData.map((index) => `${index.sets} sets of ${index.reps} reps of ${index.title}`).join('\\n')}`,
    startTime: "2021-07-07T10:30:00+08:00",
    endTime: "2021-07-09T12:00:00+08:00",
  });
  const [rawContent, setRawContent] = useState(``);
  const [daysChosen, setDaysChosen] = useState(["MO"]);
  const [duration, setDuration] = useState(30);
  const [repeat, setRepeat] = useState(1);

  //When startTime changes
  const handleTimeChange = (date) => {
    //only change time
    if (repeat == 1 ) {
      var updatedStartTime = new Date(iCalTitle.startTime);
      updatedStartTime.setHours(date.getHours());
      updatedStartTime.setMinutes(date.getMinutes());
      var updatedEndTime = new Date(iCalTitle.endTime);
      updatedEndTime.setHours(updatedStartTime.getHours() + Math.floor(duration / 60));
      updatedEndTime.setMinutes(updatedStartTime.getMinutes() + (duration % 60));
      setICalTitle({
        ...iCalTitle,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
      });
      //change time AND find appropriate date
    } else {
      var updatedTime = new Date();
      updatedTime.setHours(date.getHours());
      updatedTime.setMinutes(date.getMinutes());
      const offset = getStartDate(daysChosen);
      updatedTime.setDate(updatedTime.getDate() + offset);
      var updatedEndTime2 = new Date(updatedTime);
      updatedEndTime2.setHours(updatedTime.getHours() + Math.floor(duration / 60));
      updatedEndTime2.setMinutes(updatedTime.getMinutes() + (duration % 60));
      setICalTitle({
        ...iCalTitle,
        startTime: updatedTime,
        endTime: updatedEndTime2,
      });
    }
  };

  const handleDateChange = (date) => {
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

  //When endTime changes
  const handleEndtime = (event) => {
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

  const handleRepeat = (event) => {
    setRepeat(event.target.value);
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

  useEffect(() => {
    addDays(daysChosen);
    updateDate(daysChosen);
  }, [daysChosen, repeat]);

  //When startDate changes
  function updateDate(daysChosen) {
    if (daysChosen.length) {
      var updatedTime = new Date(iCalTitle.startTime);
      var today = new Date();
      const offset = getStartDate(daysChosen);
      updatedTime.setDate(today.getDate() + offset);
      var updatedEndTime = new Date(updatedTime);
      updatedEndTime.setHours(
        updatedTime.getHours() + Math.floor(duration / 60)
      );
      updatedEndTime.setMinutes(updatedTime.getMinutes() + (duration % 60));
      setICalTitle({
        ...iCalTitle,
        startTime: updatedTime,
        endTime: updatedEndTime,
      });
    }
  }

  function addDays(event) {
    if (repeat == 1) {
      setRawContent("");
    } else {
      if (event.length) {
        const str = event.join();
        setRawContent(`RRULE:FREQ=WEEKLY;BYDAY=${str};INTERVAL=1`);
      } else {
        setRawContent("");
      }
    }
  }

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
              id="Repeater best gun"
              value={repeat}
              onChange={handleRepeat}
            >
              <option value={1}>Once</option>
              <option value={0}>Weekly</option>
            </NativeSelect>
          </FormControl>
          {repeat == 0 && (
            <div>
              <br />
              <DialogContentText>
                Please select the days to have your workout
              </DialogContentText>
              <ToggleButtonGroup value={daysChosen} onChange={handledaysChosen}>
                <ToggleButton value="MO">Monday</ToggleButton>
                <ToggleButton value="TU">Tuesday</ToggleButton>
                <ToggleButton value="WE">Wednesday</ToggleButton>
                <ToggleButton value="TH">Thursday</ToggleButton>
                <ToggleButton value="FR">Friday</ToggleButton>
                <ToggleButton value="SA">Saturday</ToggleButton>
                <ToggleButton value="SU">Sunday</ToggleButton>
              </ToggleButtonGroup>
              {!daysChosen.length && (
                <Alert severity="error">Please choose at least one day!</Alert>
              )}
              <br />
              <br />
            </div>
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {repeat == 1 && (
              <div>
                <br />
                <DialogContentText>
                  Please select the date for your workout
                </DialogContentText>
                <KeyboardDatePicker
                  // margin="normal"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={iCalTitle.startTime}
                  onChange={handleDateChange}
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
              // margin="normal"
              id="time-picker"
              // label="Pick start time"
              disabled={!daysChosen.length}
              value={iCalTitle.startTime}
              onChange={handleTimeChange}
              // onChange={(event) => console.log(event.getTimezoneOffset())}
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
              onChange={handleEndtime}
              // onChange={(event) => console.log(event.target.value.minutes)}
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
          <Button disabled={repeat == 0 && !daysChosen.length} color="primary">
            <ICalendarLink
              style={{
                textDecoration: "inherit",
                color: "inherit",
              }}
              event={iCalTitle}
              rawContent={repeat ? rawContent : ""}
            >
              Add to Calendar
            </ICalendarLink>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
