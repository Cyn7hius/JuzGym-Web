import React, { useState, useEffect } from "react";
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

function ExerciseList(props) {
  //const [isScrolling, setIsScrolling] = useState(false);
  //Simple function to split the JSON string by \n and returns it as an array
  function NewLineParser(str) {
    var outputArray = str.split(/\r?\n/);
    return outputArray;
  }
  const { database, firestoreData, setData } = props;

  function addExercise(name) {
    // const index = firestoreData.length;
    const newExercises = [
      ...firestoreData,
      {
        title: name,
        sets: 0,
        reps: 0,
        // position: index
      },
    ];
    setData(newExercises);
  }

  function removeExercise(name) {
    const newExercises = firestoreData.filter((array) => array.title != name);
    setData(newExercises);
  }

  function exerciseButton(event, name) {
    event.stopPropagation();
    event.preventDefault();
    if (firestoreData.find((array) => array.title == name) != null) {
      removeExercise(name);
    } else {
      addExercise(name);
    }
  }

  function exerciseButtonText(name) {
    if (firestoreData.find((array) => array.title == name) != null) {
      return "Remove from workout";
    } else {
      return "Add to workout";
    }
  }

  /*Updates the array in firestore whenever the local array changes */
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ Workout: firestoreData });
  }, [firestoreData]);

  return (
    <Container>
      <Box>
        <Virtuoso
          style={{ width: "auto", height: "80vh" }}
          //Uses the data from json file
          data={database}
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
                  onClick={(event) => exerciseButton(event, exercise.name)}
                >
                  {exerciseButtonText(exercise.name)}
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
}

export default function FilterExercises({ equipmentFilter, muscleFilter }) {
  //converts the URL clicks into filters
  const filterOne =
    equipmentFilter == "DUMBBELL"
      ? 1
      : equipmentFilter == "RESISTANCE BAND"
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

  const [firestoreData, setFirestoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  function setData(newData) {
    setFirestoreData(newData);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        const db = firebase.firestore();
        const docRef = db.collection("/users").doc(uid);
    
        docRef.get().then((doc) => {
          if (doc.exists) {
            setFirestoreData(doc.data().Workout, setLoading(true));
          } else {
            setFirestoreData([], setLoading(true));
          }
        });
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const filteredData = data.filter(CheckExercise);
  return loading ? (
    <ExerciseList
      database={filteredData}
      firestoreData={firestoreData}
      setData={setData}
    />
  ) : (
    <h1>Loading workouts...</h1>
  );
}
