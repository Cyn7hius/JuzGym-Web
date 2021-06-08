import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  makeStyles,
} from "@material-ui/core/";

function ExerciseList({ database }) {
  //const [isScrolling, setIsScrolling] = useState(false);

  //Simple function to split the JSON string by \n and returns it as an array
  function NewLineParser(str) {
    var outputArray = str.split(/\r?\n/);
    return outputArray;
  }

  return (
    <Container>
      <Box>
        <Virtuoso
          style={{ width: "auto", height: "80vh" }}
          //Uses the data from json file
          data={database}
          overscan={200}
          //Total number of exercises to render
          itemContent={(index, exercise) => (
            <Accordion>
              {/* This div is for the image */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  {exercise.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Typography
                      variant="h6"
                      style={{ fontWeight: 500, textDecoration: "underline" }}
                    >
                      Instructions:
                    </Typography>

                    <Typography
                      component={"span"}
                      style={{ whiteSpace: "pre-line" }}
                      align="left"
                    >
                      {/* console.log(JSONNumberParser(exercise.instructions)) */}
                      <ol>
                        {NewLineParser(exercise.instructions).map(
                          (instruction) => {
                            return (
                              <li key={instruction.toString()}>
                                {instruction}
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </Typography>
                    <br />
                    <Typography
                      variant="h6"
                      style={{ fontWeight: 500, textDecoration: "underline" }}
                    >
                      Safety:
                    </Typography>
                    <Typography
                      component={"span"}
                      style={{ whiteSpace: "pre-line" }}
                      align="left"
                    >
                      <ul>
                        {NewLineParser(exercise.safety).map((safety) => {
                          return <li key={safety.toString()}>{safety}</li>;
                        })}
                      </ul>
                    </Typography>
                    <br />
                    <Typography
                      variant="h6"
                      style={{ fontWeight: 500, textDecoration: "underline" }}
                    >
                      Variations:
                    </Typography>

                    <Typography
                      component={"span"}
                      style={{ whiteSpace: "pre-line" }}
                      align="left"
                    >
                      <ul>
                        {NewLineParser(exercise.variations).map((variation) => {
                          return (
                            <li key={variation.toString()}>{variation}</li>
                          );
                        })}
                      </ul>
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid item xs="auto" style={{ width: "45%" }}>
                    <img height="auto" width="90%" src={exercise.image} />
                    <Typography>
                      Placeholder link for video if we need
                    </Typography>
                    <YoutubeEmbed embedId={exercise.video} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}
        />
      </Box>
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
