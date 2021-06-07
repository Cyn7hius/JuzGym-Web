import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function App({ database }) {
  //const [isScrolling, setIsScrolling] = useState(false);
  return (
    <Virtuoso
      style={{ height: "400px" }}
      //Uses the data from json file
      data={database}
      //isScrolling={setIsScrolling}
      //Total number of exercises to render
      totalCount={200}
      itemContent={(index, exercise) => (
        <Accordion>
          {/* This div is for the image */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{exercise.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* This div is the title + instructions */}
            <h4>Insert pic here</h4>
            <div style={{ marginTop: "1rem", whiteSpace: 'pre-line'}}>{exercise.instructions}</div>
          </AccordionDetails>
        </Accordion>
      )}
    />
  );
}

function FilterExercises({ equipmentFilter, muscleFilter }) {
  //converts the URL clicks into filters
  const filterOne =
    equipmentFilter == "DUMBBELL"
      ? 1
      : equipmentFilter == "RESISTANCE BANDS"
      ? 2
      : equipmentFilter == "BODYWEIGHT"
      ? 3
      : 4;
  const filterTwo =
    muscleFilter == "CORE AND BACK"
      ? 5
      : muscleFilter == "LOWER BODY"
      ? 6
      : muscleFilter == "UPPER BODY"
      ? 7
      : 8;
  function checkExercise(exercise) {
    return (
      (filterOne == 4 || exercise.equipmentType == filterOne) &&
      (filterTwo == 8 || exercise.muscleType == filterTwo)
    );
  }
  const filteredData = data.filter(checkExercise);
  return <App database={filteredData} />;
}

export default function ExerciseList({ equipmentFilter, muscleFilter }) {
  return (
    <Container>
      <FilterExercises
        equipmentFilter={equipmentFilter}
        muscleFilter={muscleFilter}
      />
    </Container>
  );
}
