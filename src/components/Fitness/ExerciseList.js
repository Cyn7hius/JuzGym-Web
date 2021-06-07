import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";

function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <Virtuoso
      style={{ height: "400px" }}
      //Uses the data from json file
      data={data}
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

export default function ExerciseList({ id, id2 }) {
  // return <h1> {id} EXERCISES: {id2} </h1>;
  return <App />;
}
