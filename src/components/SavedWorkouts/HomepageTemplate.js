import React from "react";
import { Virtuoso } from "react-virtuoso";
import {
  Typography,
  Container,
  Divider,
  ListItem,
  Box,
  Button,
  Grid,
  Paper,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import ExerciseDatabase from "./ExerciseDatabase";

//firestoredata is the curated exercises + sets + reps
export default function Homepage(props) {
  const {
    firestoreData,
    setData,
    workoutOne,
    setOne,
    workoutTwo,
    setTwo,
    workoutThree,
    setThree,
  } = props;

  function addExercise(name, number) {
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = [
      ...workoutData,
      {
        title: name,
        sets: 0,
        reps: 0,
      },
    ];
    number == 1
      ? setOne(newExercises)
      : number == 2
      ? setTwo(newExercises)
      : setThree(newExercises);
    // setData(newExercises);
  }

  function removeExerciseMain(name) {
    removeExerciseSub(name, 1);
    removeExerciseSub(name, 2);
    removeExerciseSub(name, 3);
    const newExercises = firestoreData.filter((array) => array.title != name);
    setData(newExercises);
  }

  function removeExerciseSub(name, number) {
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    const newExercises = workoutData.filter((array) => array.title != name);
    number == 1
      ? setOne(newExercises)
      : number == 2
      ? setTwo(newExercises)
      : setThree(newExercises);
  }

  function exerciseButton(event, name, number) {
    event.stopPropagation();
    event.preventDefault();
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    if (workoutData.find((array) => array.title == name) != null) {
      removeExerciseSub(name, number);
    } else {
      addExercise(name, number);
    }
  }

  function exerciseButtonText(name, number) {
    //Add another condition to filter the exercises
    const workoutData =
      number == 1 ? workoutOne : number == 2 ? workoutTwo : workoutThree;
    if (workoutData.find((array) => array.title == name) != null) {
      return `Remove from workout ${number}`;
    } else {
      return `Add to workout ${number}`;
    }
    // if (typeof workoutData !== "undefined") {
    //   return `Add to workout ${number}`;
    // } else {
    //   return `Remove from workout ${number}`;
    // }
  }

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
    <div>
      {!window.mobileCheck() ? (
        <h1>These are the exercises you have added</h1>
      ) : (
        <h3>These are the exercises you have added</h3>
      )}

      <Container maxWidth="lg">
        <Box>
          <Virtuoso
            style={
              !window.mobileCheck()
                ? { width: "auto", height: "40vh" }
                : { width: "auto", height: "80vh" }
            }
            //Uses the data from json file
            data={firestoreData}
            //Total number of exercises to render
            overscan={70}
            totalCount={70}
            itemContent={(index, exercise) =>
              !window.mobileCheck() ? (
                <div>
                  <ListItem>
                    <Grid container>
                      <Grid item xs>
                        <Typography variant="h6" style={{ fontWeight: 500 }}>
                          {exercise.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ marginLeft: "auto", marginRight: 20 }}
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 1)
                          }
                        >
                          {exerciseButtonText(exercise.title, 1)}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ marginLeft: "auto", marginRight: 20 }}
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 2)
                          }
                        >
                          {exerciseButtonText(exercise.title, 2)}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ marginLeft: "auto", marginRight: 20 }}
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 3)
                          }
                        >
                          {exerciseButtonText(exercise.title, 3)}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ marginLeft: "auto", marginRight: 0 }}
                          onClick={() => removeExerciseMain(exercise.title)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              ) : (
                <div>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="h6" style={{ fontWeight: 500 }}>
                          {exercise.title}
                        </Typography>
                        <Button
                          onClick={() => removeExerciseMain(exercise.title)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>

                      <Grid item xs={6}>
                        <Button
                          size="small"
                          fullWidth="true"
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 1)
                          }
                        >
                          {exerciseButtonText(exercise.title, 1)}
                        </Button>

                        <Button
                          size="small"
                          fullWidth="true"
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 2)
                          }
                        >
                          {exerciseButtonText(exercise.title, 2)}
                        </Button>

                        <Button
                          size="small"
                          fullWidth="true"
                          onClick={(event) =>
                            exerciseButton(event, exercise.title, 3)
                          }
                        >
                          {exerciseButtonText(exercise.title, 3)}
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              )
            }
          />
        </Box>
      </Container>
      {!window.mobileCheck() ? (
        <h1>Exercise details</h1>
      ) : (
        <h3>Exercise details</h3>
      )}
      <ExerciseDatabase firestoreData={firestoreData} />
    </div>
  );
}
