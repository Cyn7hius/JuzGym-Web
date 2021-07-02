import React, { useState, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
//Can add into the import statement below
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";
import { List, arrayMove, arrayRemove } from "react-movable";
import { CSVLink, CSVDownload } from "react-csv";
import ICalendarLink from "react-icalendar-link";
import { Reorder, Delete, Save, GetApp } from "@material-ui/icons";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

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
  ButtonGroup,
  Menu,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core/";

export default function UserWorkout() {
  const [firestoreData, setFirestoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loadUser(isLoggedIn) {
    setLoading(true);
    setIsLoggedIn(isLoggedIn);
  }

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
            setFirestoreData(doc.data().Workout, loadUser(true));
          } else {
            setFirestoreData([], loadUser(true));
          }
        });
      } else {
        // User is signed out
        loadUser(false);
      }
    });
  }, []);

  return loading ? (
    isLoggedIn ? (
      <ExerciseList firestoreData={firestoreData} setData={setData} />
    ) : (
      <h1>You are not logged in, log in now to save your workouts!</h1>
    )
  ) : (
    <h1>Loading workouts...</h1>
  );
}

//Top half
function ExerciseList(props) {
  const { firestoreData, setData } = props;
  //added here
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users").doc(uid).set({ Workout: firestoreData });
  }, [firestoreData]);

  function updateReps(title, newReps) {
    const newArray = [...firestoreData];
    const position = newArray.findIndex((index) => index.title === title);
    newArray[position] = {
      ...newArray[position],
      reps: parseInt(newReps),
    };
    setData(newArray);
  }

  function updateSets(title, newSets) {
    const newArray = [...firestoreData];
    const position = newArray.findIndex((index) => index.title === title);
    newArray[position] = {
      ...newArray[position],
      sets: parseInt(newSets),
    };
    setData(newArray);
  }

  //Might be redundant function
  function updatePosition(items) {
    const newArray = [...items];
    setData(newArray);
  }
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

  const headers = [
    { label: "Name", key: "title" },
    { label: "Reps", key: "reps" },
    { label: "Sets", key: "sets" },
  ];

  const csvReport = {
    filename: "Workout.csv",
    headers: headers,
    data: firestoreData,
  };

  const event = {
    title: "Workout",
    description: "My Description",
    startTime: "2021-07-03T10:30:00+10:00",
    endTime: "2021-07-03T12:00:00+10:00",
  };

  const rawContent = `RRULE:FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;COUNT=3`;

  return firestoreData.length ? (
    <div
      style={{
        //Hardcoded
        backgroundColor: "#F7F7F7",
        padding: "3em",
        textAlign: "right",
      }}
    >
      <ButtonGroup color="primary">
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Save />}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<GetApp />}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Download
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      Spreadsheet (.csv)
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      iCalendar File(.ics)
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
      <List
        values={firestoreData}
        onChange={({ oldIndex, newIndex }) =>
          updatePosition(arrayMove(firestoreData, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{
              padding: "0em 0em 1em 0em",
              width: "1300px",
              marginLeft: "auto",
              marginRight: "auto",
              cursor: isDragged ? "grabbing" : "inherit",
            }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, index, isDragged, isSelected }) => (
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
                <Reorder />
              </button>
              <div
                style={{
                  width: "100px",
                }}
              >
                {value.title}
              </div>
              <FormControl>
                <InputLabel>Reps</InputLabel>
                <NativeSelect
                  id={value.title + " reps"}
                  value={value.reps}
                  onChange={(event) =>
                    updateReps(value.title, event.target.value)
                  }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                  <option value={26}>26</option>
                  <option value={27}>27</option>
                  <option value={28}>28</option>
                  <option value={29}>29</option>
                  <option value={30}>30</option>
                  <option value={35}>35</option>
                  <option value={40}>40</option>
                  <option value={45}>45</option>
                  <option value={50}>50</option>
                </NativeSelect>
              </FormControl>

              <FormControl>
                <InputLabel>Sets</InputLabel>
                <NativeSelect
                  id={value.title + " sets"}
                  value={value.sets}
                  onChange={(event) =>
                    updateSets(value.title, event.target.value)
                  }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                  <option value={26}>26</option>
                  <option value={27}>27</option>
                  <option value={28}>28</option>
                  <option value={29}>29</option>
                  <option value={30}>30</option>
                  <option value={35}>35</option>
                  <option value={40}>40</option>
                  <option value={45}>45</option>
                  <option value={50}>50</option>
                </NativeSelect>
              </FormControl>
              <button
                onClick={() => {
                  updatePosition(
                    typeof index !== "undefined"
                      ? arrayRemove(firestoreData, index)
                      : firestoreData
                  );
                }}
                style={buttonStyles}
              >
                <Delete />
              </button>
            </div>
          </li>
        )}
      />
      {/* <CSVLink {...csvReport}>Export to CSV</CSVLink>
        <ICalendarLink event={event} rawContent={rawContent}>
          Add to Calendar
        </ICalendarLink> */}

      <ExerciseDatabase firestoreData={firestoreData} />
    </div>
  ) : (
    <h1>You have no exercises saved, try adding some from our database?</h1>
  );
}

//Bottom half
function ExerciseDatabase(props) {
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
