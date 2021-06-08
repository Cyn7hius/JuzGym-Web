import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core/";

function ExerciseList({ database }) {
  //const [isScrolling, setIsScrolling] = useState(false);
  return (
    <Container>
      <Virtuoso
        style={{ height: "700px" }}
        //Uses the data from json file
        data={database}
        //isScrolling={setIsScrolling}
        //Total number of exercises to render
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
              <Grid container spacing={4}>
                <Grid item xs>
                  <Typography
                    style={{ whiteSpace: "pre-line" }}
                    align="left"
                  >
                    {exercise.instructions}
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs="auto" style={{ width: 500 }}>
                  <img height="auto" width="90%" src={exercise.image} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      />
    </Container>
  );
}

export default function FilterExercises({ equipmentFilter, muscleFilter }) {
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
  function CheckExercise(exercise) {
    return (
      (filterOne == 4 || exercise.equipmentType == filterOne) &&
      (filterTwo == 8 || exercise.muscleType == filterTwo)
    );
  }
  const filteredData = data.filter(CheckExercise);
  return <ExerciseList database={filteredData} />;
}
