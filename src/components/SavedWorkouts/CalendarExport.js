import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormHelperText, FormLabel, FormControlLabel, MenuItem } from "@material-ui/core";
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
import Alert from '@material-ui/lab/Alert';

export default function ExportIcs() {
  const [form, setForm] = useState(false);
  const [iCalTitle, setICalTitle] = useState({
    title: "Workout",
    description: "My Description",
    startTime: "2021-07-07T10:30:00+10:00",
    endTime: "2021-07-07T12:00:00+10:00",
  });
  const [rawContent, setRawContent] = useState(``);
  const [daysChosen, setDaysChosen] = useState(["MO"]);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setICalTitle({ ...iCalTitle, startTime: date });
    // console.log(date.toTimeString());
    console.log(date.getTimezoneOffset());
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
  }, [daysChosen]);

  function addDays(event) {
    if (event.length > 0) {
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
    while (!selectedDays.filter(x => (dayStringtoNumber(x) == day)).length) {
        if (day == 6 ) {
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

  //sunday is 0, then mon to sat 1-6
  function dateTime() {
    // const x = new Date().toLocaleString() + "";
    var x = new Date();
    console.log(x);
    console.log(x.getFullYear());
    console.log(x.getDay());
    console.log(x.getDate());
    x.setDate(11);
    console.log(x.getDay());
    console.log(x.getDate());
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
          {!daysChosen.length &&<Alert severity="error">Please choose at least one day!</Alert>}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <br/>
              <br/>
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
          <Button value={0} onClick={dateTime} color="primary">
            DATE
          </Button>
          <Button>
            <ICalendarLink
              style={{
                textDecoration: "inherit",
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
