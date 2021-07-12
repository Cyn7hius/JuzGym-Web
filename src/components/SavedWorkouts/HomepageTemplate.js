import React, { useState, useEffect, Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";
import YoutubeEmbed from "../../data/YoutubeEmbed";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core/";
import ExerciseDatabase from "./ExerciseDatabase";
import ExercisePlanner from "./ExercisePlanner";

//firestoredata is the curated exercises + sets + reps
export default function Homepage(props) {
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

  function addExercise(name, number) {
    const workoutData = number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = [
      ...workoutData,
      {
        title: name,
        sets: 0,
        reps: 0,
      },
    ];
    number == 1 ? setOne(newExercises) : number == 2 ? setTwo(newExercises) : setThree(newExercises);
    // setData(newExercises);
  }

  function removeExerciseMain(name) {
    const newExercises = firestoreData.filter((array) => array.title != name);
    setData(newExercises);
  }

  function removeExerciseSub(name, number) {
    const workoutData = number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = workoutData.filter((array) => array.title != name);
    number == 1 ? setOne(newExercises) : number == 2 ? setTwo(newExercises) : setThree(newExercises);
  }

  function exerciseButton(event, name, number) {
    event.stopPropagation();
    event.preventDefault();
    const workoutData = number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    if (workoutData.find((array) => array.title == name) != null) {
      removeExerciseSub(name, number);
    } else {
      addExercise(name, number);
    }
  }

  function exerciseButtonText(name, number) {
    //Add another condition to filter the exercises
    const workoutData = number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    if (workoutData.find((array) => array.title == name) != null) {
      return `Remove from workout ${number}`;
    } else {
      return `Add to workout ${number}`;
    }
    // if (typeof workoutData !== "undefined") {
    //   return `Add to workout ${number}`;
    // } else {
    //   return `Remove from workout ${number}`;
    // }
  }

  /*Updates the array in firestore whenever the local array changes */
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ Workout: firestoreData });
  }, [firestoreData]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ WorkoutOne: workoutOne });
  }, [workoutOne]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ WorkoutTwo: workoutTwo });
  }, [workoutTwo]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ WorkoutThree: workoutThree });
  }, [workoutThree]);

  return (
    <div>
      <h1>These are the exercises you have added</h1>
      <Container>
        <Box>
          <Virtuoso
            style={{ width: "auto", height: "80vh" }}
            //Uses the data from json file
            data={firestoreData}
            //Total number of exercises to render
            overscan={70}
            totalCount={70}
            itemContent={(index, exercise) => (
              <div>
                <ListItem>
                  <Typography variant="h5" style={{ fontWeight: 500 }}>
                    {exercise.title}
                  </Typography>
                  <Button
                  style={{ marginLeft: "auto", marginRight: 0 }}
                  onClick={(event) => exerciseButton(event, exercise.title, 1)}
                >
                  {exerciseButtonText(exercise.title, 1)}
                </Button>
                <Button
                  style={{ marginLeft: "auto", marginRight: 0 }}
                  onClick={(event) => exerciseButton(event, exercise.title, 2)}
                >
                  {exerciseButtonText(exercise.title, 2)}
                </Button>
                <Button
                  style={{ marginLeft: "auto", marginRight: 0 }}
                  onClick={(event) => exerciseButton(event, exercise.title, 3)}
                >
                  {exerciseButtonText(exercise.title, 3)}
                </Button>
                </ListItem>
                <Divider />
              </div>
            )}
          />
        </Box>
      </Container>
      <ExerciseDatabase firestoreData={firestoreData} />
    </div>
  );
}
