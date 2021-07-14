import React, { useState, useEffect, Fragment } from "react";
//Can add into the import statement below
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";
import ExercisePlanner from "./ExercisePlanner";

//firestoredata is the curated exercises + sets + reps
export default function WorkoutPage(props) {
  const { workoutData, setWorkoutData, display, workoutNames, setNames } =
    props;

  const workoutNumber =
    display == 1
      ? workoutNames[0].WorkoutOne
      : display == 2
      ? workoutNames[0].WorkoutTwo
      : workoutNames[0].WorkoutThree;

  return workoutData.length ? (
    <div>
      <h1>{workoutNumber}</h1>
      <ExercisePlanner
        firestoreData={workoutData}
        setData={setWorkoutData}
        display={display}
      />
      <ExportButton firestoreData={workoutData} />
      <ExerciseDatabase firestoreData={workoutData} />
    </div>
  ) : (
    <h1>You have no exercises added to this workout!</h1>
  );
}
