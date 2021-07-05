import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem } from "@material-ui/core";
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

export default function ExportIcs() {
  const [form, setForm] = useState(false);
  const [iCalTitle, setICalTitle] = useState({
    title: "Workout",
    description: "My Description",
    startTime: "2021-07-03T10:30:00+10:00",
    endTime: "2021-07-03T12:00:00+10:00",
  });
  const [rawContent, setRawContent] = useState(``);
  const [daysChosen, setDaysChosen] = useState([]);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    const str = event.join();
    setRawContent(`RRULE:FREQ=WEEKLY;BYDAY=${str};INTERVAL=1`);
  }

  function addTitle(event) {}

  function dateTime() {
    const x = new Date().toLocaleString() + "";
    console.log(x);
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>iCalendar File(.ics)</MenuItem>
      <Dialog
        open={form}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give Calvin all your money
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
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
            onClick={(event) => setICalTitle({ ...iCalTitle, title: "TEST" })}
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
