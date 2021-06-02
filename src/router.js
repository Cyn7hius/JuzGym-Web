import React from "react";
import Equipment from "./components/Equipment";
import About from "./components/About";
import Home from "./components/Home";

const routes = {
  "/": () => <Home />,
  "/equipment*": () => <Equipment />,
  "/about": () => <About />,
};

export default routes;