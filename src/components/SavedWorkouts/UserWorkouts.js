import React, { useState, useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";

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
  Button,
} from "@material-ui/core/";

export default function UserWorkout() {
  //const [isScrolling, setIsScrolling] = useState(false);

  //Simple function to split the JSON string by \n and returns it as an array
  function NewLineParser(str) {
    var outputArray = str.split(/\r?\n/);
    return outputArray;
  }
  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();
  const docRef = db.collection("/users").doc(uid);
  const [users, setUsersState] = useState([]);
  var localDatabase = [];
  // const [lock, setLockState] = useState(false);


  useEffect(() => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        setUsersState(doc.data().Workout);
        // setLockState(true);
      } else {
        setUsersState([]);
        // setLockState(true);
      }
    });
  }, []);

  function makeNewArray(uid) {
    const newArray = [...localDatabase, data[uid.Exercise - 1]];
    localDatabase = newArray;
  }

  users.map(makeNewArray);

  function addExercise(uid) {
    const newExercises = [
      ...users,
      {
        Exercise: uid,
      },
    ];
    setUsersState(newExercises);
    db.collection("/users").doc(uid).set({ Workout: users });
  }

  function removeExercise(uid) {
    const newExercises = users.filter((array) => array.Exercise != uid);
    setUsersState(newExercises);
    db.collection("/users").doc(uid).set({ Workout: users });
  }

  function exerciseButton(event, uid) {
    event.stopPropagation();
    event.preventDefault();
    if (users.find((array) => array.Exercise == uid) != null) {
      removeExercise(uid);
    } else {
      addExercise(uid);
    }
  }
  
  function exerciseButtonText(uid) {
    if (users.find((array) => array.Exercise == uid) != null) {
      return "Remove from workout"
    } else {
      return "Add to workout"
    }
  }

  return (
    <Container>
      <Box>
        <Virtuoso
          style={{ width: "auto", height: "80vh" }}
          //Uses the data from json file
          data={localDatabase}
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
                <Button
                  style={{ marginLeft: "auto", marginRight: 0 }}
                  onClick={(event) => exerciseButton(event, exercise.uid)}
                >
                  {exerciseButtonText(exercise.uid)}
                </Button>
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

  // if (users.length > 0) {
  //   <h1>hi</h1>;
  // } else {
  //   return (
  //     <h1>
  //       You currently have no saved exercises, try adding some of them from the
  //       exercise tab!
  //     </h1>
  //   );
  }