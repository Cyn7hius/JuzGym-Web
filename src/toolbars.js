import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRoutes, A } from "hookrouter";
import "./styles.css";
import NoPageFound from "./components/NoPageFound";
import Button from "@material-ui/core/Button";
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
    <div>
      <Tabs centered={true}>
        <p>
            <Tab
              label="Fitness"
              value="/fitness"
              component={A}
              href="/equipment"
            />
          
          <Tab
              label="Fitness"
              value="/fitness"
              component={A}
              href="/about"
            />
        </p>
      </Tabs>
      <br />
      {routeResult || <NoPageFound />}
    </div>
  );
}
