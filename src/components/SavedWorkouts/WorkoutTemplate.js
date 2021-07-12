import React, { useState, useEffect, Fragment } from "react";
//Can add into the import statement below
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";
import ExercisePlanner from "./ExercisePlanner";

//firestoredata is the curated exercises + sets + reps
export default function WorkoutPage(props) {
  const { firestoreData, setData, display } = props;

  return (
    <div>
      <h1>This is exercise {display}</h1>
      <ExportButton firestoreData={firestoreData} />
      <ExercisePlanner firestoreData={firestoreData} setData={setData} />
      <ExerciseDatabase firestoreData={firestoreData} />
    </div>
  );
}
