import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { useRoutes} from "hookrouter";
import "./styles.css";
import NoPageFound from "./components/NoPageFound";
import Button from '@material-ui/core/Button';
import Fitness from "./components/Fitness";
import Home from "./components/Home";
import Nutrition from "./components/Nutrition";

const routes = {
  "/": () => <Home />,
  "/equipment*": () => <Fitness />,
  "/about": () => <Nutrition />,
};

export default function SimpleTabs() {
  const routeResult = useRoutes(routes);

  return (
    <div >
      <AppBar position="static" color="white">
        <p>
        <Button color="primary" href="/equipment">Fitness</Button>
        <Button color="primary" href="/about">Nutrition</Button>
        </p>
      </AppBar>
      <br />
      {routeResult || <NoPageFound />}
    </div>
  );
}