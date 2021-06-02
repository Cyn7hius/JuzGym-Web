import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import { images } from "../data/equipmentNames.js";
import Dumbbell from "./Dumbbell.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function Fitness() {
  const allRoutes = [
    "../fitness/dumbbell",
    "../fitness/resistancebands",
    "../fitness/bodyweight",
    "../fitness/all",
  ];

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div style={{ margin: "5%", paddingLeft: "10%" }}>
        <Switch>
          <Route
            path="/fitness"
            render={({ location }) => (
              <div>
                <h1 style={{ paddingRight: "15%" }}> CATEGORY</h1>
                <br />

                <div className={classes.root}>
                  {images.map((image) => (
                    <ButtonBase
                      component={Link}
                      to={allRoutes[image.id]}
                      key={images.title}
                      className={classes.image}
                      style={{
                        width: "30%",
                      }}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image.url})`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          {image.title}
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  ))}
                </div>
              </div>
            )}
          />

          <Route path="/fitness/dumbbell">
            <Dumbbell />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
