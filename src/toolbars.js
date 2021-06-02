import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import Fitness from "./components/Fitness";
import Nutrition from "./components/Nutrition";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const allTabs = ["/", "/fitness", "/nutrition"];

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs value={location.pathname} centered="true">
                <Tab label="Home" value="/" component={Link} to={allTabs[0]} />
                <Tab
                  label="Fitness"
                  value="/fitness"
                  component={Link}
                  to={allTabs[1]}
                />
                <Tab
                  label="Nutrition"
                  value="/nutrition"
                  component={Link}
                  to={allTabs[2]}
                />
              </Tabs>
              <Switch>
                <Route path={allTabs[1]} render={() => <Fitness />} />
                <Route path={allTabs[2]} render={() => <Nutrition />} />
                <Route path={allTabs[0]} render={() => <div>Tab 1</div>} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}
