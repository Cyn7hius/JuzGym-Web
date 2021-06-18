import React, { useState } from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import {
  AppBar,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import SimpleTabs from "./toolbars";
import HomeIcon from "@material-ui/icons/Home";
import { A } from "hookrouter";
import "./styles.css";
import Workout from "./components/SavedWorkouts/UserWorkouts"

export default function App() {
  return (
    <div className="App">
      <AppShell />
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}></div>
      <SimpleTabs title="NavBar" />
    </div>
  );
}

function AppShell() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (firebase) => {
    handleClose();
    firebase.auth().signOut();
  };

  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const classes = useStyles();

  return (
    <AppBar position="sticky" style={{ background: "#04ae96" }}>
      <Toolbar position="sticky">
        <IconButton
          edge="start"
          className={classes.homeButton}
          color="inherit"
          aria-label="home"
          label="Home"
          value="/"
          component={A}
          href="/"
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h2"
          style={{
            fontFamily: "Odibee Sans",
            flexGrow: 1,
            textAlign: "Fixed",
            color: "black",
          }}
        >
          <div className="container">
            <Box justifyContent="flex-start" fontWeight="fontWeightBold" m={1}>
              {"JuzGym"}
            </Box>
            <Box justifyContent="flex-start" m={1}>
              Your home gym companion
            </Box>
          </div>
        </Typography>
        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div>
              <Button
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {user.displayName + "'s Workout plans"}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={() => handleLogout(firebase)}> */}
                <MenuItem component={A} href="/savedworkouts" onClick={() => Workout}>
                  {/* Logout */}
                  Saved Workouts
                </MenuItem>
              </Menu>
            </div>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <FirebaseAuthConsumer>
            {({ firebase }) => (
              <Button
                variant="contained"
                color="default"
                onClick={() => handleGoogleSignIn(firebase)}
              >
                Login
              </Button>
            )}
          </FirebaseAuthConsumer>
        </IfFirebaseUnAuthed>
      </Toolbar>
    </AppBar>
  );
}
