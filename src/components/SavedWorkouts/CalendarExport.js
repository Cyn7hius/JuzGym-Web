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

export default function ExportIcs() {
  const [form, setForm] = useState(false);
  const [iCalTitle, setICalTitle] = useState({
    title: "Workout",
    description: "My Description",
    startTime: "2021-07-07T10:30:00+08:00",
    endTime: "2021-07-09T12:00:00+08:00",
  });
  const [rawContent, setRawContent] = useState(``);
  const [daysChosen, setDaysChosen] = useState(["MO"]);
  // const [duration, setDuration] = useState([0, 0]);

  const handleDateChange = (date) => {
    var updatedTime = new Date(iCalTitle.startTime);
    updatedTime.setHours(date.getHours());
    updatedTime.setMinutes(date.getMinutes());
    var today = new Date();
    const offset = getStartDate(daysChosen);
    updatedTime.setDate(today.getDate() + offset);
    setICalTitle({ ...iCalTitle, startTime: updatedTime });
    // console.log(date.getTimezoneOffset());
    console.log(date.toDateString());
  };

  // const handleEndtime = (event) => {
  //   setDuration(event.target.value);
  //   var updatedTime = new Date(iCalTitle.startTime);
  //   updatedTime.setHours(updatedTime.getHours() + event.target.value[0]);
  //   updatedTime.setMinutes(updatedTime.getMinutes() + event.target.value[1]);
  //   setICalTitle({ ...iCalTitle, endTime: updatedTime });
  // };

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
  }, [daysChosen]);

  function updateDate(daysChosen) {
    if (daysChosen.length) {
      var updatedTime = new Date(iCalTitle.startTime);
      var today = new Date();
      const offset = getStartDate(daysChosen);
      updatedTime.setDate(today.getDate() + offset);
      setICalTitle({ ...iCalTitle, startTime: updatedTime });
      // console.log("CHANGED")
      // updatedTime.setHours(updatedTime.getHours() + duration[0]);
      // updatedTime.setMinutes(updatedTime.getMinutes() + duration[1]);
      // setICalTitle({ ...iCalTitle, endTime: updatedTime });
      // console.log(iCalTitle);
    }
  }

  function addDays(event) {
    if (event.length) {
      const str = event.join();
      setRawContent(`RRULE:FREQ=WEEKLY;BYDAY=${str};INTERVAL=1`);
    } else {
      setRawContent("");
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <br />
            <br />
            <DialogContentText>
              Please select the start time of your workout
            </DialogContentText>
            <KeyboardTimePicker
              // margin="normal"
              id="time-picker"
              // label="Pick start time"
              disabled={!daysChosen.length}
              value={iCalTitle.startTime}
              onChange={handleDateChange}
              // onChange={(event) => console.log(event.getTimezoneOffset())}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
          {/* <FormControl>
            <InputLabel>Reps</InputLabel>
            <NativeSelect
              id="Endtime"
              value={duration}
              onChange={handleEndtime}
            >
              <option value={[0, 15]}>15 minutes</option>
              <option value={[0, 30]}>30 minutes</option>
              <option value={[0, 45]}>45 minutes</option>
              <option value={[1, 0]}>1 hour</option>
              <option value={[1, 15]}>1 hour 15 minutes</option>
              <option value={[1, 30]}>1 hour 30 minutes</option>
              <option value={[1, 45]}>1 hour 45 minutes</option>
              <option value={[2, 0]}>2 hours</option>
            </NativeSelect>
          </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            value={0}
            onClick={(event) => console.log(iCalTitle.startTime)}
            color="primary"
          >
            TEST
          </Button>
          <Button disabled={!daysChosen.length} color="primary">
            <ICalendarLink
              style={{
                textDecoration: "inherit",
                color: "inherit",
              }}
              event={iCalTitle}
              rawContent={rawContent}
            >
              Add to Calendar
            </ICalendarLink>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
