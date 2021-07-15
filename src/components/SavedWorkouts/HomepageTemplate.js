import React from "react";
import { Virtuoso } from "react-virtuoso";
import {
  Typography,
  Container,
  Divider,
  ListItem,
  Box,
  Button,
} from "@material-ui/core/";
import ExerciseDatabase from "./ExerciseDatabase";

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
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = [
      ...workoutData,
      {
        title: name,
        sets: 0,
        reps: 0,
      },
    ];
    number == 1
      ? setOne(newExercises)
      : number == 2
      ? setTwo(newExercises)
      : setThree(newExercises);
    // setData(newExercises);
  }

  function removeExerciseMain(name) {
    removeExerciseSub(name, 1);
    removeExerciseSub(name, 2);
    removeExerciseSub(name, 3);
    const newExercises = firestoreData.filter((array) => array.title != name);
    setData(newExercises);
  }

  function removeExerciseSub(name, number) {
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = workoutData.filter((array) => array.title != name);
    number == 1
      ? setOne(newExercises)
      : number == 2
      ? setTwo(newExercises)
      : setThree(newExercises);
  }

  function exerciseButton(event, name, number) {
    event.stopPropagation();
    event.preventDefault();
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    if (workoutData.find((array) => array.title == name) != null) {
      removeExerciseSub(name, number);
    } else {
      addExercise(name, number);
    }
  }

  function exerciseButtonText(name, number) {
    //Add another condition to filter the exercises
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
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

  return (
    <div>
      <h1>These are the exercises you have added</h1>
      <Container>
        <Box>
          <Virtuoso
            style={{ width: "auto", height: "40vh" }}
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
                    onClick={(event) =>
                      exerciseButton(event, exercise.title, 1)
                    }
                  >
                    {exerciseButtonText(exercise.title, 1)}
                  </Button>
                  <Button
                    style={{ marginLeft: "auto", marginRight: 0 }}
                    onClick={(event) =>
                      exerciseButton(event, exercise.title, 2)
                    }
                  >
                    {exerciseButtonText(exercise.title, 2)}
                  </Button>
                  <Button
                    style={{ marginLeft: "auto", marginRight: 0 }}
                    onClick={(event) =>
                      exerciseButton(event, exercise.title, 3)
                    }
                  >
                    {exerciseButtonText(exercise.title, 3)}
                  </Button>
                  <Button
                    style={{ marginLeft: "auto", marginRight: 0 }}
                    onClick={() => removeExerciseMain(exercise.title)}
                  >
                    Remove from saved exercises
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
