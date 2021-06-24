import React from "react";
import { useRoutes, A, usePath } from "hookrouter";
import { images } from "../../data/goalNames";
import BeginnerGuide from "./BeginnerGuide";
import GetLean from "./GetLean";
import GetStrong from "./GetStrong";
import LoseWeight from "./LoseWeight";
import {
  ButtonBase,
  Typography,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";

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

function GoalsSelector() {
  const classes = useStyles();
  const path = usePath();

  return (
    <div style={{ margin: "3%" }}>
      <div>
        <h1>What is your desired fitness goal?</h1>
        <br />

        <Container className={classes.root}>
          {" "}
          {/*Container is used to keep horizontal spacing */}
          <Grid container spacing={1} justify="center">
            {images.map((image) => (
              <Grid item key={image.title} md={6}>
                <ButtonBase
                  key={images.title}
                  className={classes.image}
                  style={{
                    width: "100%",
                    height: "250px", //hardcoded
                  }}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <A href={path + image.handle}>
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default function FitnessGoals() {
  const routes = {
    "/": () => <GoalsSelector />,
    "/getstrong": () => <GetStrong id="GET STRONG" />,
    "/getlean": () => <GetLean id="GET LEAN" />,
    "/loseweight": () => <LoseWeight id="LOSE WEIGHT" />,
    "/beginnerguide": () => <BeginnerGuide id="BEGINNER GUIDE" />,
  };

  const routeResult = useRoutes(routes);
  return routeResult;
}
