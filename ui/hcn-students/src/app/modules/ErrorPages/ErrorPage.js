import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ErrorPage01 from "./ErrorPage01";

export default function ErrorsPage() {
  return (
    <Switch>
      <Redirect from="/error" exact={true} to="/error/404" />
      <Route path="/error/404" component={ErrorPage01} />
      <Redirect to="/error" />
    </Switch>
  );
}
