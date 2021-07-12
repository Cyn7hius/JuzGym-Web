import React, { useState, useEffect, Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
//Can add into the import statement below
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";
import { List, arrayMove, arrayRemove } from "react-movable";
import { Reorder, Delete, Save, GetApp } from "@material-ui/icons";
import ExportIcs from "./components/CalendarExport";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";

import YoutubeEmbed from "../../data/YoutubeEmbed";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  Grid,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Tabs,
  Tab,
  Popper,
  MenuList,
} from "@material-ui/core/";
import ExportExcel from "./components/ExcelExport";
import WorkoutPage from "./WorkoutTemplate";
import ExercisePlanner from "./ExercisePlanner";
import Homepage from "./HomepageTemplate";

export default function UserWorkout() {
  const [firestoreData, setFirestoreData] = useState([]);
  // const [workoutOne, setWorkoutOne] = useState([
  //   {
  //     title: "Dumbbell Crunch",
  //     sets: 0,
  //     reps: 0,
  //   },
  // ]);
  // const [workoutTwo, setWorkoutTwo] = useState([
  //   {
  //     title: "Dumbbell Crunch",
  //     sets: 0,
  //     reps: 0,
  //   },
  // ]);
  // const [workoutThree, setWorkoutThree] = useState([
  //   {
  //     title: "Dumbbell Crunch",
  //     sets: 0,
  //     reps: 0,
  //   },
  // ]);
  const [workoutOne, setWorkoutOne] = useState([]);
  const [workoutTwo, setWorkoutTwo] = useState([]);
  const [workoutThree, setWorkoutThree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loadUser(isLoggedIn) {
    setLoading(true);
    setIsLoggedIn(isLoggedIn);
  }

  function setData(newData) {
    setFirestoreData(newData);
  }

  function setOne(newData) {
    setWorkoutOne(newData);
  }

  function setTwo(newData) {
    setWorkoutTwo(newData);
  }

  function setThree(newData) {
    setWorkoutThree(newData);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        const db = firebase.firestore();
        const docRef = db.collection("/users").doc(uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            // setWorkoutOne(doc.data().WorkoutOne);
            // setWorkoutTwo(doc.data().WorkoutTwo);
            // setWorkoutThree(doc.data().WorkoutThree);
            setFirestoreData(doc.data().Workout, loadUser(true));
          } else {
            // setWorkoutOne([
            //   {
            //     title: "Dumbbell Crunch",
            //     sets: 0,
            //     reps: 0,
            //   },
            // ]);
            // setWorkoutTwo([
            //   {
            //     title: "Dumbbell Crunch",
            //     sets: 0,
            //     reps: 0,
            //   },
            // ]);
            // setWorkoutThree([
            //   {
            //     title: "Dumbbell Crunch",
            //     sets: 0,
            //     reps: 0,
            //   },
            // ]);
            setFirestoreData([], loadUser(true));
          }
        });
      } else {
        // User is signed out
        loadUser(false);
      }
    });
  }, []);

  return loading ? (
    isLoggedIn ? (
      <ExerciseList
        firestoreData={firestoreData}
        setData={setData}
        workoutOne={workoutOne}
        setOne={setOne}
        workoutTwo={workoutTwo}
        setTwo={setTwo}
        workoutThree={workoutThree}
        setThree={setThree}
      />
    ) : (
      <h1>You are not logged in, log in now to save your workouts!</h1>
    )
  ) : (
    <h1>Loading workouts...</h1>
  );
}

function ExerciseList(props) {
  const {
    firestoreData,
    setData,
    workoutOne,
    setOne,
    workoutTwo,
    setTwo,
    workoutThree,
    setThree,
  } = props;
  const [display, setDisplay] = useState(0);

  return firestoreData.length ? (
    <div
      style={
        {
          //Hardcoded
          // backgroundColor: "#F7F7F7",
          // // padding: "3em",
          // textAlign: "right",
        }
      }
    >
      <div
        style={{
          backgroundColor: "#48ff00",
          textAlign: "center",
        }}
      >
        <Fragment>
          <Tabs centered={true}>
            <Tab
              label="Added Exercises"
              value="Homepage"
              onClick={() => {
                setDisplay(1);
              }}
            />
            <Divider orientation="vertical" flexItem />
            <Tab
              label="Workout One"
              value="Workout One"
              onClick={() => {
                setDisplay(2);
              }}
            />
            <Divider orientation="vertical" flexItem />
            <Tab
              label="Workout Two"
              value="Workout Two"
              onClick={() => {
                setDisplay(3);
              }}
            />
            <Divider orientation="vertical" flexItem />
            <Tab
              label="Workout Three"
              value="Workout Three"
              onClick={() => {
                setDisplay(4);
              }}
            />
          </Tabs>
        </Fragment>
      </div>

      {display == 0 ? (
        <Homepage
          firestoreData={firestoreData}
          setData={setData}
          workoutOne={workoutOne}
          setOne={setOne}
          workoutTwo={workoutTwo}
          setTwo={setTwo}
          workoutThree={workoutThree}
          setThree={setThree}
        />
      ) : (
        <WorkoutPage
          firestoreData={firestoreData}
          setData={setData}
          display={display}
        />
      )}
    </div>
  ) : (
    <h1>You have no exercises saved, try adding some from our database?</h1>
  );
}
