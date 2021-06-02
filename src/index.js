import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom"; 

import { config } from "./config/firebase";

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
      <CssBaseline />
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <App />
      </FirebaseAuthProvider>
  </BrowserRouter>,
  rootElement
);
