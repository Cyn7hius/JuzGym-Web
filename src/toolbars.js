import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { useRoutes, A} from "hookrouter";
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
        <Button color="primary" ><A href="/equipment">Fitness</A></Button>
        <Button color="primary" ><A href="/about">Nutrition</A></Button>
        </p>
      </AppBar>
      <br />
      {routeResult || <NoPageFound />}
    </div>
  );
}