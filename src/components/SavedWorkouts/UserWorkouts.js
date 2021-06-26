import React, { useState, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";
import TextField from "@material-ui/core/TextField";
import { List, arrayMove, arrayRemove } from "react-movable";

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
  const [firestoreData, setFirestoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  function setData(newData) {
    setFirestoreData(newData);
  }

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/users").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setFirestoreData(doc.data().Workout, setLoading(true));
        console.log("Found Firestore Data");
        console.log(loading);
      } else {
        setFirestoreData([], setLoading(true));
        console.log("Did not find Firestore Data");
        console.log(loading);
      }
    });
  }, []);

  return loading ? (
    <div>
      <ExerciseList firestoreData={firestoreData} setData={setData} />
      <ExerciseDatabase
        firestoreData={firestoreData}
        setData={setData}
        loading={loading}
      />
    </div>
  ) : (
    <h1>Loading workouts...</h1>
  );
}

//Top half
function ExerciseList(props) {
  const { firestoreData, setData } = props;
  // const newDatabase = firestoreData.map((uid) => data[uid.Exercise - 1].name);
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    setItems(firestoreData.map((uid) => data[uid.Exercise - 1].name));
  }, [firestoreData]);

  const HandleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#555"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-move"
    >
      <polyline points="5 9 2 12 5 15" />
      <polyline points="9 5 12 2 15 5" />
      <polyline points="15 19 12 22 9 19" />
      <polyline points="19 9 22 12 19 15" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );

  const buttonStyles = {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    cursor: "pointer",
    background: "transparent",
  };

  const RemovableIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#555"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x-circle"
    >
      <title>Remove</title>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );

  return (
    <div
      style={{
        //Hardcoded
        width: "1300px",
        margin: "0px auto",
        backgroundColor: "#F7F7F7",
        padding: "3em",
        textAlign: "center",
      }}
    >
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{
              padding: "0em 0em 1em 0em",
              cursor: isDragged ? "grabbing" : "inherit",
            }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: "1.5em",
              margin: "0.5em 0em",
              listStyleType: "none",
              border: "2px solid #CCC",
              boxShadow: "3px 3px #AAA",
              color: "#333",
              borderRadius: "5px",
              cursor: isDragged ? "grabbing" : "inherit",
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* 
                  Mark any node with the data-movable-handle attribute if you wish
                  to use is it as a DnD handle. The rest of renderItem will be then
                  ignored and not start the drag and drop. 
                */}
              <button
                data-movable-handle
                style={{
                  ...buttonStyles,
                  cursor: isDragged ? "grabbing" : "grab",
                  marginRight: "3em",
                }}
                tabIndex={-1}
              >
                <HandleIcon />
              </button>
              <div
                style={{
                  width: "100px",
                }}
              >
                {value}
              </div>
              <TextField
                id="standard-number1"
                label="Reps"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="standard-number2"
                label="Sets"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </li>
        )}
      />
    </div>
  );
}

//Bottom half
function ExerciseDatabase(props) {
  //const [isScrolling, setIsScrolling] = useState(false);
  //Simple function to split the JSON string by \n and returns it as an array
  function NewLineParser(str) {
    var outputArray = str.split(/\r?\n/);
    return outputArray;
  }
  const { firestoreData, setData, loading } = props;
  //The curated database
  // const newDatabase = firestoreData.map((uid) => data[uid.Exercise - 1]);
  const [newDatabase, setNewDatabase] = useState([]);
  useEffect(() => {
    setNewDatabase(firestoreData.map((uid) => data[uid.Exercise - 1]));
  }, [firestoreData]);

  function addExercise(uid) {
    const newExercises = [
      ...firestoreData,
      {
        Exercise: uid,
      },
    ];
    setData(newExercises);
  }

  function removeExercise(uid) {
    const newExercises = firestoreData.filter((array) => array.Exercise != uid);
    setData(newExercises);
  }

  function exerciseButton(event, uid) {
    event.stopPropagation();
    event.preventDefault();
    if (firestoreData.find((array) => array.Exercise == uid) != null) {
      removeExercise(uid);
    } else {
      addExercise(uid);
    }
  }

  function exerciseButtonText(uid) {
    if (firestoreData.find((array) => array.Exercise == uid) != null) {
      return "Remove from workout";
    } else {
      return "Add to workout";
    }
  }

  /*Updates the array in firestore whenever the local array changes */
  useEffect(() => {
    if (firestoreData.length) {
      console.log(firestoreData + " LOWER HALF DATABASE");
      console.log(loading + " LOWER HALF BOOLEAN");
      const uid = firebase.auth().currentUser?.uid;
      const db = firebase.firestore();
      db.collection("/users").doc(uid).set({ Workout: firestoreData });
    } 
  }, [firestoreData]);
  return firestoreData.length ? (
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
  ) : (
    <h1>You have no exercises saved, try adding some from our database?</h1>
  );
}
