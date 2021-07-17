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
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import { A } from "hookrouter";
import "../styles.css";
import UserVerification from "./SavedWorkouts/UserVerification";

export default function AppbarMobile() {
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

  const handleSavedWorkouts = () => {
    handleClose();
    UserVerification;
  };

  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

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

  const classes = useStyles();

  return (
    <AppBar position="sticky" style={{ background: "#04ae96" }}>
      <Toolbar position="sticky">
        <Tooltip title="Return to Homepage">
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
        </Tooltip>
        <Grid container>
          <Grid item>
            <Typography
              // variant="h1"
              style={{
                fontFamily: "Odibee Sans",
                flexGrow: 1,
                fontSize: "3rem",
                textAlign: "Fixed",
                color: "black",
              }}
            >
              {" JuzGymm"}
            </Typography>
          </Grid>
        </Grid>

        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div>
              <Button
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {"Menu"}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={A}
                  href="/savedworkouts"
                  onClick={() => handleSavedWorkouts()}
                >
                  Saved Workouts
                </MenuItem>
                <MenuItem onClick={() => handleLogout(firebase)}>
                  Logout
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
