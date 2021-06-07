import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";

function App({ database }) {
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <Virtuoso
      style={{ height: "400px" }}
      //Uses the data from json file
      data={database}
      isScrolling={setIsScrolling}
      //Total number of exercises to render
      totalCount={200}
      itemContent={(index, user) => (
        <div
          style={{
            backgroundColor: user.bgColor,
            padding: "1rem 0",
          }}
        >
          {/* This div is for the image */}
          <div style={{ float: "left", margin: "1rem" }}>
            {/* {isScrolling ? avatarPlaceholder() : avatar() } */}
            {isScrolling ? <h4>scrolling</h4> : <h4>Picture of exercise</h4>}
          </div>

          {/* This div is the title + instructions */}
          <h4>{user.name}</h4>
          <div style={{ marginTop: "1rem" }}>{user.instructions}</div>
        </div>
      )}
    />
  );
}

function FilterExercises({ id, id2 }) {
  //converts the URL clicks into filters
  const filterOne =
    id == "DUMBBELL"
      ? 1
      : id == "RESISTANCE BANDS"
      ? 2
      : id == "BODYWEIGHT"
      ? 3
      : 4;
  const filterTwo =
    id2 == "CORE AND BACK"
      ? 5
      : id == "LOWER BODY"
      ? 6
      : id == "UPPER BODY"
      ? 7
      : 8;
  function checkExercise(element) {
    return (filterOne == 4 || element.id1 == filterOne) && (filterTwo == 8 || element.id2 == filterTwo)
  }
  const filteredData = data.filter(checkExercise);
  return <App database={filteredData}/>
}

export default function ExerciseList({ id, id2 }) {
  return <FilterExercises id={id} id2={id2} />;
}
