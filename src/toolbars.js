import { React, Fragment } from "react";
import { Tabs, Tab, Divider } from "@material-ui/core/";
import { useRoutes, A, usePath } from "hookrouter";
import "./styles.css";
import NoPageFound from "./components/NoPageFound";
import Fitness from "./components/Fitness/EquipmentFilter";
import Home from "./components/Home";
import FitnessGoals from "./components/Nutrition/FitnessGoals";
import UserVerification from "./components/SavedWorkouts/UserVerification";

const routes = {
  "/": () => <Home />,
  "/savedworkouts": () => <UserVerification />,
  //wildcard routes
  "/exercises*": () => <Fitness />,
  "/education*": () => <FitnessGoals />,
};

export default function SimpleTabs() {
  const routeResult = useRoutes(routes);
  const pathname = usePath().slice(0, 10); //hacky way to have a persistent indicator, basically ignores the URL after /equipment or /nutrition

  return (
    <div>
      <Fragment>
        <Tabs value={pathname} centered={true}>
          <Tab
            label="Fitness Guide"
            value="/education"
            component={A} //A is from hookrouter, uses the tabs as an anchor, doing this CAUSES an ERROR in the console log due to Tab being a ButtonBase
            href="/education"
          />
          <Divider orientation="vertical" flexItem />
          <Tab
            label="Exercises"
            value="/exercises"
            component={A}
            href="/exercises"
          />
        </Tabs>
      </Fragment>
      {/* <br /> */}
      {routeResult || <NoPageFound />}
    </div>
  );
}
