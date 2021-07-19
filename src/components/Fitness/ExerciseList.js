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
  function NewLineParser(str) {
    var outputArray = str.split(/\r?\n/);
    return outputArray;
  }
  const { database, firestoreData, setData, isLoggedIn } = props;

  function addExercise(name) {
    const newExercises = [
      ...firestoreData,
      {
        title: name,
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
      return "Remove from saved exercises";
    } else {
      return "Add to saved exercises";
    }
  }

  /*Updates the array in firestore whenever the local array changes */
  useEffect(() => {
    if (isLoggedIn) {
      const uid = firebase.auth().currentUser?.uid;
      const db = firebase.firestore();
      db.collection("/users")
        .doc(uid)
        .set({ Workout: firestoreData }, { merge: true });
    }
  }, [firestoreData]);

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  return (
    <Container>
      <Box>
        <Virtuoso
          style={
            !window.mobileCheck()
              ? { width: "auto", height: "80vh" }
              : { width: "96vw", height: "80vh" }
          }
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
                <Grid container>
                  <Grid item xs>
                    <Typography
                      variant="h6"
                      align="left"
                      style={{ fontWeight: 500 }}
                    >
                      {exercise.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      disabled={!isLoggedIn}
                      style={{ marginLeft: "auto", marginRight: 0 }}
                      onClick={(event) => exerciseButton(event, exercise.name)}
                    >
                      {exerciseButtonText(exercise.name)}
                    </Button>
                  </Grid>
                </Grid>
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
                  <Grid
                    item
                    xs="auto"
                    // uses the mobile checker regex to alter the layout accordingly
                    style={
                      !window.mobileCheck()
                        ? { width: "45%" }
                        : { width: "100%" }
                    }
                  >
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

  const coreAndBack = new RegExp("[5]");
  const lowerBody = new RegExp("[6]");
  const upperBody = new RegExp("[7]");
  const allMuscles = new RegExp("[5-7]");

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
      ? "5"
      : muscleFilter == "LOWER BODY"
      ? "6"
      : muscleFilter == "UPPER BODY"
      ? "7"
      : 8;

  const regexToUse =
    filterTwo == "5"
      ? coreAndBack
      : filterTwo == "6"
      ? lowerBody
      : filterTwo == "7"
      ? upperBody
      : allMuscles;

  function CheckExercise(exercise) {
    return (
      (filterOne == 4 || exercise.equipmentType == filterOne) &&
      regexToUse.test(exercise.muscleType)
    );
  }

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

  const filteredData = data.filter(CheckExercise);
  return loading ? (
    <ExerciseList
      database={filteredData}
      firestoreData={firestoreData}
      setData={setData}
      isLoggedIn={isLoggedIn}
    />
  ) : (
    <h1>Loading workouts...</h1>
  );
}
