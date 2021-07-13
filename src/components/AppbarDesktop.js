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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import { A } from "hookrouter";
import "../styles.css";
import Workout from "./SavedWorkouts/UserWorkouts";

export default function AppbarDesktop() {
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

  return (
    <AppBar position="sticky" style={{ background: "#04ae96" }}>
      <Toolbar position="sticky">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          label="Home"
          value="/"
          component={A}
          href="/"
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography
              style={{
                fontFamily: "Odibee Sans",
                fontSize: "4.5rem",
                color: "black",
                flexGrow: 1,
              }}
            >
              {" JuzGym"}
            </Typography>
          </Grid>
          <Grid item lg>
            <Typography
              align="left"
              style={{
                fontFamily: "Odibee Sans",
                fontSize: "3rem",
                color: "black",
              }}
            >
              {"Your Home Gym Companion"}
            </Typography>
          </Grid>

          <Grid item xs={2} style={{ display: "flex", alignItems: "flex-end" }}>
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
                    <MenuItem
                      component={A}
                      href="/savedworkouts"
                      onClick={() => Workout}
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
