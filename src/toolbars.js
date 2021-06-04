import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRoutes, A, usePath } from "hookrouter";
import "./styles.css";
import NoPageFound from "./components/NoPageFound";
import Fitness from "./components/Fitness";
import Home from "./components/Home";
import Nutrition from "./components/Nutrition";
import { Fragment } from "react";

const routes = {
  "/": () => <Home />,
  "/equipment*": () => <Fitness />,
  "/nutrition*": () => <Nutrition />,
};

export default function SimpleTabs() {
  const routeResult = useRoutes(routes);
  const pathname = usePath().slice(0,10);
  console.log(usePath().slice(0,10));

  return (
    <div>
      <Fragment>
        <Tabs value={pathname} centered={true}>
          <Tab
            label="Fitness"
            value="/equipment"
            component={A}
            href="/equipment"
          />

          <Tab
            label="Nutrition"
            value="/nutrition"
            component={A}
            href="/nutrition"
          />
        </Tabs>
      </Fragment>
      <br />
      {routeResult || <NoPageFound />}
    </div>
  );
}
