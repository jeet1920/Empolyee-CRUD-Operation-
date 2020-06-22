import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Component/Register";
import EditEmployee from './Component/EditEmployee';
import DashBoard from "./Component/DashBoard";

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={({ history }) => {
        window.appHistory = history;
        return <Register />;
        }}
      />
      <Route
        exact
        path="/dashboard"
        component={({ history }) => {
        window.appHistory = history;
        return <DashBoard />;
        }}
      />
      <Route path='/editemployee/:id' component={EditEmployee} />
    </Switch>
  );
}
export default App;
