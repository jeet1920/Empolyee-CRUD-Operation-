import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory as createHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
