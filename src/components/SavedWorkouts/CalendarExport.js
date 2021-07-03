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

export default function ExportIcs() {
  const [form, setForm] = useState(false);

  const handleClickOpen = () => {
    setForm(true);
  };

  const handleClose = () => {
    setForm(false);
  };
  const event = {
    title: "Workout",
    description: "My Description",
    startTime: "2021-07-03T10:30:00+10:00",
    endTime: "2021-07-03T12:00:00+10:00",
  };

  const rawContent = `RRULE:FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;COUNT=3`;

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
          <FormControl>
                <InputLabel>Repeat</InputLabel>
                <NativeSelect
                  id="Repeat"
                  value={0}
                //   onChange={
                //   }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                </NativeSelect>
              </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
          <ICalendarLink event={event} rawContent={rawContent}>
            Add to Calendar
          </ICalendarLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}
