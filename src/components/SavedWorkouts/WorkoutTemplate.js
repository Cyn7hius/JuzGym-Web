import React, { useState, useEffect, Fragment } from "react";
//Can add into the import statement below
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";
import ExercisePlanner from "./ExercisePlanner";
import EditIcon from "@material-ui/icons/Edit";
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
export default function WorkoutPage(props) {
  const { workoutData, setWorkoutData, workoutName, handleSetName } =
    props;
  const [form, setForm] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState("");

  const handleClickOpen = () => {
    setForm(true);
  };

  const handleClose = () => {
    setWorkoutTitle("");
    setForm(false);
  };

  const handleNameChange = (event) => {
    setWorkoutTitle(event);
  };

  const saveNewName = () => {
    handleSetName(workoutTitle);
    handleClose();
  }

  return workoutData.length ? (
    <div>
      <h1>
        {workoutName}
        <button
          onClick={handleClickOpen}
          style={{
            border: "none",
            margin: 0,
            paddingLeft: 10,
            width: "auto",
            overflow: "visible",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          <EditIcon />
        </button>
      </h1>
      <Dialog
        open={form}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Rename Workout</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Name"
              value={workoutTitle}
              inputProps={{ maxLength: 40 }}
              helperText="Maximum of 40 characters"
              onChange={(event) => handleNameChange(event.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveNewName} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ExercisePlanner
        firestoreData={workoutData}
        setData={setWorkoutData}
      />
      <ExportButton firestoreData={workoutData} workoutName={workoutName} />
      <ExerciseDatabase firestoreData={workoutData} />
    </div>
  ) : (
    <h1>You have no exercises added to this workout!</h1>
  );
}
