import { useState } from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AppShell />
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}></div>
    </div>
  );
}

function AppShell() {
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" style={{fontFamily: "Odibee Sans", flexGrow: 1, textAlign: "Center" }}>

          <Box fontWeight="fontWeightBold" m={1}>
            JuzGym
          </Box>
        </Typography>
        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
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
                color="primary"
                onClick={() => handleGoogleSignIn(firebase)}
              >
                Sign in with Google
              </Button>
            )}
          </FirebaseAuthConsumer>
        </IfFirebaseUnAuthed>
      </Toolbar>
    </AppBar>
  );
}
