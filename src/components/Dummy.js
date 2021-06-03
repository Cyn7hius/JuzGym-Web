import React from "react";
import { Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import { useRoutes, A } from "hookrouter";
import { images } from "../data/muscleNames";
import ExerciseList from "./ExerciseList";

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

function Home({ id}) {
  const classes = useStyles();

  return (
    <div style={{ margin: "5%", paddingLeft: "10%" }}>
      <div>
        <h1>{id}</h1>
        <h1 style={{ paddingRight: "15%" }}> CATEGORY</h1>
        <br />
        <div className={classes.root}>
          {images.map((image) => (
            <ButtonBase
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
              <A href={id + image.handle}>
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
              </A>
            </ButtonBase>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Fitness({ id }) {
  const routes = {
    "/": () => <Home id={id} />,
    "/core*": () => <ExerciseList id={id} id2="/core" />,
    "/upper*": () => <ExerciseList id={id} id2="/upper" />,
    "/lower*": () => <ExerciseList id={id} id2="/lower" />,
    "/all*": () => <ExerciseList id={id} id2="/all" />,
  };

  const routeResult = useRoutes(routes);
  return routeResult;
}
