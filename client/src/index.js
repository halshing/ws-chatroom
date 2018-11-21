import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import "./index.css";
import App from "./components/App";

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
