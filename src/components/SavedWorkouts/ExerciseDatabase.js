import React, { useState, useEffect } from "react";
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
} from "@material-ui/core/";

export default function ExerciseDatabase(props) {
    function NewLineParser(str) {
      var outputArray = str.split(/\r?\n/);
      return outputArray;
    }
    const { firestoreData } = props;
    // const newDatabase = firestoreData.map((uid) => data[uid.Exercise - 1]);
    const [newDatabase, setNewDatabase] = useState([]);
    useEffect(() => {
      setNewDatabase(
        firestoreData.map((firestoreArray) =>
          data.find((localData) => localData.name == firestoreArray.title)
        )
      );
    }, [firestoreData]);
  
    return (
      <Container>
        <Box>
          <Virtuoso
            style={{ width: "auto", height: "80vh" }}
            //Uses the data from json file
            data={newDatabase}
            //Total number of exercises to render
            overscan={70}
            totalCount={70}
            itemContent={(index, exercise) => (
              <Accordion key={exercise.toString()}>
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
  
                <AccordionDetails style={{ background: "#f2f2f2" }}>
                  <Grid container spacing={2}>
                    {/* Instructions portion */}
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
                      <Divider />
                      <br />
  
                      {/* Tips portion */}
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 500, textDecoration: "underline" }}
                      >
                        Tips:
                      </Typography>
                      <Typography
                        component={"span"}
                        style={{ whiteSpace: "pre-line" }}
                        align="left"
                      >
                        <ul>
                          {NewLineParser(exercise.tips).map((tip) => {
                            return <li key={tip.toString()}>{tip}</li>;
                          })}
                        </ul>
                      </Typography>
                      <Divider />
                      <br />
  
                      {/* Variations portion */}
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
  
                    {/* Right Side of the Exercise info */}
                    <Grid item xs="auto" style={{ width: "45%" }}>
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 500, textDecoration: "underline" }}
                      >
                        {"Main muscles worked: " + exercise.targetGroup}
                      </Typography>
  
                      <br />
  
                      {/* Image for each exercise */}
                      <img height="auto" width="90%" src={exercise.image} />
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 500, textDecoration: "underline" }}
                      >
                        {"Video guide: "}
                      </Typography>
  
                      {/* Embeded YouTube video */}
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