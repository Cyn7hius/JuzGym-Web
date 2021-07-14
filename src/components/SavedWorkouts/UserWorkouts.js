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
  const [workoutOne, setWorkoutOne] = useState([]);
  const [workoutTwo, setWorkoutTwo] = useState([]);
  const [workoutThree, setWorkoutThree] = useState([]);
  const [workoutNames, setWorkoutNames] = useState([]);
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

  function setNames(newData) {
    setWorkoutNames(newData);
  }

  function firebaseSetup(doc) {
    if (typeof doc.data().WorkoutOne !== "undefined") {
      setWorkoutOne(doc.data().WorkoutOne);
    }
    if (typeof doc.data().WorkoutTwo !== "undefined") {
      setWorkoutTwo(doc.data().WorkoutTwo);
    }
    if (typeof doc.data().WorkoutThree !== "undefined") {
      setWorkoutThree(doc.data().WorkoutThree);
    }
    if (typeof doc.data().WorkoutNames !== "undefined") {
      setWorkoutNames(doc.data().WorkoutNames);
    }
    if (typeof doc.data().WorkoutNames === "undefined") {
      setWorkoutNames([
        {
          WorkoutOne: "Workout One",
          WorkoutTwo: "Workout Two",
          WorkoutThree: "Workout Three",
        },
      ]);
    }
    setFirestoreData(doc.data().Workout, loadUser(true));
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
            firebaseSetup(doc);
          } else {
            setWorkoutOne([]);
            setWorkoutTwo([]);
            setWorkoutThree([]);
            setWorkoutNames([]);
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
        workoutNames={workoutNames}
        setNames={setNames}
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
    workoutNames,
    setNames,
  } = props;
  const [display, setDisplay] = useState(0);

  /*Updates the array in firestore whenever the local array changes */
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ Workout: firestoreData }, { merge: true });
  }, [firestoreData]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutOne: workoutOne }, { merge: true });
  }, [workoutOne]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutTwo: workoutTwo }, { merge: true });
  }, [workoutTwo]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutThree: workoutThree }, { merge: true });
  }, [workoutThree]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutNames: workoutNames }, { merge: true });
  }, [workoutNames]);

  const handleSetName = (newName) => {
    if (display == 1) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutOne: newName
      }
      setNames(newArray);
    }
    if (display == 2) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutTwo: newName
      }
      setNames(newArray);
    }
    if (display == 3) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutThree: newName
      }
      setNames(newArray);
    }
  }

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
          // backgroundColor: "#48ff00",
          textAlign: "center",
        }}
      >
        <Fragment>
          <ButtonGroup>
            <Button
              label="Added Exercises"
              value="Homepage"
              onClick={() => {
                setDisplay(0);
              }}
            >
              Added Exercises
            </Button>
            <Button
              label="Workout One"
              value="Workout One"
              onClick={() => {
                setDisplay(1);
              }}
            >
              {workoutNames[0].WorkoutOne}
            </Button>
            <Button
              label="Workout Two"
              value="Workout Two"
              onClick={() => {
                setDisplay(2);
              }}
            >
              {workoutNames[0].WorkoutTwo}
            </Button>
            <Button
              label="Workout Three"
              value="Workout Three"
              onClick={() => {
                setDisplay(3);
              }}
            >
              {workoutNames[0].WorkoutThree}
            </Button>
          </ButtonGroup>
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
          workoutData={
            display == 1 ? workoutOne : display == 2 ? workoutTwo : workoutThree
          }
          setWorkoutData={
            display == 1 ? setOne : display == 2 ? setTwo : setThree
          }
          display={display}
          workoutName={
            display == 1
              ? workoutNames[0].WorkoutOne
              : display == 2
              ? workoutNames[0].WorkoutTwo
              : workoutNames[0].WorkoutThree
          }
          handleSetName={handleSetName}
        />
      )}
    </div>
  ) : (
    <h1>You have no exercises saved, try adding some from our database?</h1>
  );
}
