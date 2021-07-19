import React, { useState, useEffect } from "react";
import left from "../data/left.gif";
import right from "../data/right.gif";
import { Button } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1280px",
    marginLeft: "auto",
    marginRight: "auto",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CommonTips() {
  const [initialTime, setInitialTime] = useState(10);
  const [startTimer, setStartTimer] = useState(false);
  const [unlockVideo, setUnlockVideo] = useState(false);

  const classes = useStyles();

  const handleOnClick = () => {
    setInitialTime(10);
    setStartTimer(true);
  };

  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        console.log("Countdown: ", initialTime);
        setInitialTime(initialTime - 1);
      }, 1000);
    }

    if (initialTime === 0 && startTimer) {
      console.log("Blastofffffffffffffff ");
      setUnlockVideo(true);
      setStartTimer(false);
    }
  }, [initialTime, startTimer]);

  return (
    <div>
      {!unlockVideo && (
        <div>
          <h1> Welcome to Dillon's Steam Profile!</h1>
          <h4> Refresh the page if it looked buggy </h4>
          <div>
            <img src={left} alt="IMAGE LEFT" />
            <img src={right} alt="IMAGE RIGHT" />
          </div>
          <Button onClick={handleOnClick}>🌚</Button>
        </div>
      )}

      {unlockVideo && (
        <div>
          <br />
          <br />
          <iframe
            width="1280"
            height="720"
            src={`https://www.youtube.com/embed/fPtD_IoZi-c `}
            frameBorder="0"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      )}

      {unlockVideo && (
        <div className={classes.root}>
          <Alert variant="outlined" severity="error">
            WARNING: Profanity Alert, Autism Alert, Cancer Gameplay, High Toxicity, 0 Teamwork
          </Alert>
        </div>
      )}
    </div>
  );
}
