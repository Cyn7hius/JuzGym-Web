import React from "react";
import { A, usePath } from "hookrouter";
import { images } from "../data/homePageCategory";
import {
  Typography,
  Container,
  ButtonBase,
  makeStyles,
  Grid,
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

export default function Home() {
  const classes = useStyles();

  return (
    <div style={{ margin: "3%" }}>
      <div>
        <Container className={classes.root}>
          {" "}
          {/*Container is used to keep horizontal spacing */}
          <Grid container spacing={1} justify="center">
            {images.map((image) => (
              <Grid item key={image.title} md={6}>
                <ButtonBase
                  key={images.title}
                  className={classes.image}
                  style={
                    !window.mobileCheck()
                      ? {
                          width: "32vw",
                          height: "30vh", //hardcoded
                        }
                      : {
                          width: "40vw",
                          height: "20vh", //hardcoded
                        }
                  }
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <A href={image.handle}>
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
          <div>
            <br />
            <br />
            <Container>
              <Typography variant={"h3"}>Welcome to JuzGymm!</Typography>
              <br />

              <Typography variant={"h6"}>What is JuzGymm?</Typography>
              <Typography>
                JuzGymm is made to be your one-stop home workout companion. With
                the current pandemic climate, and the increased pace of life,
                many of us are stuck at home with limited equipment. However, we
                believe that with the right training regime, home workouts can
                be a suitable replacement for joining a gym.
              </Typography>
              <br />
              <Typography variant={"h6"}>How to use JuzGymm?</Typography>
              <Typography>
                To start, please log in to get the full features of JuzGymm
                including bookmarking your workouts. For newcommers, we included
                a {<A href={"./education/beginnerguide"}>Beginner's Guide</A>}{" "}
                that includes everything you need to start your fitness journey!
                We scoured the web to compile and collate exercises into one
                platform, where you can easily view instructions, tips and even
                a video demo. If you are signed-in, you can bookmark your
                favourite exercises, which you can access by clicking on the top
                right button. There, you can also customize your own workout
                plans and export them. Moreover, we included a educational
                component to provide a step-by-step guide to achieve your
                fitness goals.
              </Typography>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
}
