import React, { useState, useEffect, Fragment } from "react";
//Can add into the import statement below
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";
import ExercisePlanner from "./ExercisePlanner";

//firestoredata is the curated exercises + sets + reps
export default function WorkoutPage(props) {
  const { workoutData, setWorkoutData, display } = props;

  return workoutData.length ? (
    <div>
      <h1>This is exercise {display}</h1>
      <ExportButton firestoreData={workoutData} />
      <ExercisePlanner firestoreData={workoutData} setData={setWorkoutData} display={display} />
      <ExerciseDatabase firestoreData={workoutData} />
    </div>
  ) : (<h1>You have no exercises here! Sadge</h1>);
}
