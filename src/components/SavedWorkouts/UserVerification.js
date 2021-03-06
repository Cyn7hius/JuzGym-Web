import React, { useState, useEffect, Fragment } from "react";
import { firebase } from "@firebase/app";
import { Button, ButtonGroup, Fab, MenuItem, Menu } from "@material-ui/core/";
import WorkoutPage from "./WorkoutPage";
import Homepage from "./AddedExercisesPage";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

//The only component in SavedWorkouts that deals with fetching/updating data from/to firebase
//Renders AddedExercisesPage once user has been verified
export default function UserVerification() {
  // firestoreData is the array from firebase that only consists of the exercise names that were added by the user
  // workoutOne is the array from firebase that only consists of exercises, reps and sets that were added to "Workout One" by the user
  // workoutTwo is the array from firebase that only consists of exercises, reps and sets that were added to "Workout Two" by the user
  // workoutThree is the array from firebase that only consists of exercises, reps and sets that were added to "Workout Three" by the user
  // workoutNames is the array from firebase that only consists of custom titles given to the three workouts by the user
  const [firestoreData, setFirestoreData] = useState([]);
  const [workoutOne, setWorkoutOne] = useState([]);
  const [workoutTwo, setWorkoutTwo] = useState([]);
  const [workoutThree, setWorkoutThree] = useState([]);
  const [workoutNames, setWorkoutNames] = useState([]);
  //Used to display the AddedExercisesPage to the user once the data has been fetched from firebase
  const [loading, setLoading] = useState(false);
  //Used to check if the user's UID has been recorded in firebase
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loadUser(isLoggedIn) {
    setLoading(true);
    setIsLoggedIn(isLoggedIn);
  }

  function setData(newData) {
    setFirestoreData(newData);
  }

  function setOne(newData) {
    setWorkoutOne(newData);
  }

  function setTwo(newData) {
    setWorkoutTwo(newData);
  }

  function setThree(newData) {
    setWorkoutThree(newData);
  }

  function setNames(newData) {
    setWorkoutNames(newData);
  }

  //When user is logged in, fetches data from firebase and updates the local arrays accordingly
  function firebaseSetup(doc) {
    if (typeof doc.data().WorkoutOne !== "undefined") {
      setWorkoutOne(doc.data().WorkoutOne);
    }
    if (typeof doc.data().WorkoutTwo !== "undefined") {
      setWorkoutTwo(doc.data().WorkoutTwo);
    }
    if (typeof doc.data().WorkoutThree !== "undefined") {
      setWorkoutThree(doc.data().WorkoutThree);
    }
    setWorkoutNames(
      typeof doc.data().WorkoutNames === "undefined"
        ? [
            {
              WorkoutOne: "Workout One",
              WorkoutTwo: "Workout Two",
              WorkoutThree: "Workout Three",
            },
          ]
        : doc.data().WorkoutNames
    );
    setFirestoreData(doc.data().Workout, loadUser(true));
  }

  function firebaseFirstTimeSetup() {
    setWorkoutOne([]);
    setWorkoutTwo([]);
    setWorkoutThree([]);
    setWorkoutNames([
      {
        WorkoutOne: "Workout One",
        WorkoutTwo: "Workout Two",
        WorkoutThree: "Workout Three",
      },
    ]);
    setFirestoreData([], loadUser(true));
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
          //Scenario when this happens: User is logged in and has previously accessed either Saved Workout Page OR Exercise List Page
          if (doc.exists) {
            firebaseSetup(doc);
          }
          //Scenario when this happens: User is logged in and has NEVER accessed either Saved Workout Page OR Exercise List Page
          else {
            firebaseFirstTimeSetup();
          }
        });
      } else {
        // User is not logged in
        loadUser(false);
      }
    });
  }, []);

  //Checks if user is logged in and calls VerifiedUser component if user is verified
  return loading ? (
    isLoggedIn ? (
      <VerifiedUser
        firestoreData={firestoreData}
        setData={setData}
        workoutOne={workoutOne}
        setOne={setOne}
        workoutTwo={workoutTwo}
        setTwo={setTwo}
        workoutThree={workoutThree}
        setThree={setThree}
        workoutNames={workoutNames}
        setNames={setNames}
      />
    ) : (
      <h1>You are not logged in, log in now to save your workouts!</h1>
    )
  ) : (
    <h1>Loading workouts...</h1>
  );
}

function VerifiedUser(props) {
  const {
    firestoreData,
    setData,
    workoutOne,
    setOne,
    workoutTwo,
    setTwo,
    workoutThree,
    setThree,
    workoutNames,
    setNames,
  } = props;

  //display is used to check which button the user pressed and loads the page accordingly
  const [display, setDisplay] = useState(0);

  /*The following 5 useEffects updates their respective arrays in firebase when their local array changes */
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ Workout: firestoreData }, { merge: true });
  }, [firestoreData]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutOne: workoutOne }, { merge: true });
  }, [workoutOne]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutTwo: workoutTwo }, { merge: true });
  }, [workoutTwo]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutThree: workoutThree }, { merge: true });
  }, [workoutThree]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/users")
      .doc(uid)
      .set({ WorkoutNames: workoutNames }, { merge: true });
  }, [workoutNames]);

  const handleSetName = (newName) => {
    if (display == 1) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutOne: newName,
      };
      setNames(newArray);
    }
    if (display == 2) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutTwo: newName,
      };
      setNames(newArray);
    }
    if (display == 3) {
      const newArray = [...workoutNames];
      newArray[0] = {
        ...newArray[0],
        WorkoutThree: newName,
      };
      setNames(newArray);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return firestoreData.length ? (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {!window.mobileCheck() ? (
          <Fragment>
            <br />
            <ButtonGroup>
              <Button
                variant="contained"
                label="Saved Exercises"
                value="Homepage"
                onClick={() => {
                  setDisplay(0);
                }}
                style={{ color: "white", backgroundColor: "grey" }}
              >
                Saved Exercises
              </Button>
              <Button
                variant="contained"
                label="Workout One"
                value="Workout One"
                onClick={() => {
                  setDisplay(1);
                }}
                style={{ color: "white", backgroundColor: "darkgreen" }}
              >
                Workout One
              </Button>
              <Button
                variant="contained"
                label="Workout Two"
                value="Workout Two"
                onClick={() => {
                  setDisplay(2);
                }}
                style={{ color: "white", backgroundColor: "darkred" }}
              >
                Workout Two
              </Button>
              <Button
                variant="contained"
                label="Workout Three"
                value="Workout Three"
                onClick={() => {
                  setDisplay(3);
                }}
                style={{ color: "white", backgroundColor: "darkblue" }}
              >
                Workout Three
              </Button>
            </ButtonGroup>
          </Fragment>
        ) : (
          <div>
            <Fab
              aria-controls="workout-menu"
              aria-haspopup="true"
              variant="primary"
              style={{
                margin: 0,
                top: "auto",
                right: 20,
                bottom: 20,
                left: "auto",
                position: "fixed",
                zIndex: 1000,
                background: "#04ae96",
                color: "black",
              }}
              onClick={handleClick}
            >
              <FormatListNumberedIcon />
              Your Workouts
            </Fab>
            <Menu
              id="workout-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                label="Added Exercises"
                value="Homepage"
                onClick={() => {
                  handleClose();
                  setDisplay(0);
                }}
              >
                Added Exercises
              </MenuItem>
              <MenuItem
                label="Workout One"
                value="Workout One"
                onClick={() => {
                  handleClose();
                  setDisplay(1);
                }}
              >
                {"Workout 1"}
              </MenuItem>
              <MenuItem
                label="Workout Two"
                value="Workout Two"
                onClick={() => {
                  handleClose();
                  setDisplay(2);
                }}
              >
                {"Workout 2"}
              </MenuItem>
              <MenuItem
                label="Workout Three"
                value="Workout Three"
                onClick={() => {
                  handleClose();
                  setDisplay(3);
                }}
              >
                {"Workout 3"}
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      {/* render AddedExercisesPage if display is 0 else render WorkoutPage */}
      {display == 0 ? (
        <Homepage
          firestoreData={firestoreData}
          setData={setData}
          workoutOne={workoutOne}
          setOne={setOne}
          workoutTwo={workoutTwo}
          setTwo={setTwo}
          workoutThree={workoutThree}
          setThree={setThree}
        />
      ) : (
        <WorkoutPage
          workoutData={
            display == 1 ? workoutOne : display == 2 ? workoutTwo : workoutThree
          }
          setWorkoutData={
            display == 1 ? setOne : display == 2 ? setTwo : setThree
          }
          display={display}
          workoutName={
            display == 1
              ? workoutNames[0].WorkoutOne
              : display == 2
              ? workoutNames[0].WorkoutTwo
              : workoutNames[0].WorkoutThree
          }
          handleSetName={handleSetName}
        />
      )}
    </div>
  ) : (
    <h1>You have no exercises saved, try adding some from our database?</h1>
  );
}
