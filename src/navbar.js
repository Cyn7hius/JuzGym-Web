import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { useRoutes, A } from "hookrouter";
import "./styles.css";
import routes from "./router";
// import NoPageFound from "./components/NoPageFound";
// import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function SimpleTabs() {
  // const classes = useStyles();
  const routeResult = useRoutes(routes);

  return (
    // <div className={classes.root}>
    <div >
      <AppBar position="static" color="white">
        <p>
        <Button color="primary" href="/equipment">Fitness</Button>
        <Button color="primary" href="/about">Nutrition</Button>
        </p>
      </AppBar>
      <br />
      {routeResult}
    </div>
  );
}