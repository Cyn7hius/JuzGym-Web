import React from "react";
import { useRoutes, A, usePath } from "hookrouter";
import { images } from "../../data/muscleNames";
import ExerciseList from "./ExerciseList";
import {
  ButtonBase,
  Typography,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      //width: "100% !important", // Overrides inline-style
      width: "100%",
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
    backgroundPosition: "center 50%",
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

function MuscleSelector() {
  const classes = useStyles();
  const path = usePath();

  return (
    <div style={{ margin: "3%" }}>
      <div>
        <h1> Which muscle groups are you targetting?</h1>

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
                    width: "32vw",
                    height: "30vh", //hardcoded
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

export default function MuscleFilter(props) {
  const equipment = props.equipmentFilter;
  const routes = {
    "/": () => <MuscleSelector />,

    // take the props passed from the equipment page, and send it together with muscleFilter prop to ExerciseList

    "/core*": () => (
      <ExerciseList equipmentFilter={equipment} muscleFilter="CORE AND BACK" />
    ),
    "/upper*": () => (
      <ExerciseList equipmentFilter={equipment} muscleFilter="UPPER BODY" />
    ),
    "/lower*": () => (
      <ExerciseList equipmentFilter={equipment} muscleFilter="LOWER BODY" />
    ),
    "/all*": () => (
      <ExerciseList equipmentFilter={equipment} muscleFilter="ALL BODY PARTS" />
    ),
  };

  const routeResult = useRoutes(routes);
  return routeResult;
}
