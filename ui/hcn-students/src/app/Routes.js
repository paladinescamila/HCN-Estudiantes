import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "../theme/layout";
import BasePage from "./BasePage";
import ErrorsPage from "./modules/ErrorPages/ErrorPage";
import { LoginForm } from "./pages/auth-forms/LoginForm";
import { useSelector } from "react-redux";
import { RegisterForm } from "./pages/auth-forms/RegisterForm";
import { ConfirmationForm } from "./pages/auth-forms/ConfirmationForm";

export default function Routes() {
  const { authToken } = useSelector((state) => state.auth);
  return (
    <Switch>
      <Route path="/error" component={ErrorsPage} />
      <Route path="/sign-in">{authToken !== undefined ? <Redirect to="/" /> : <LoginForm />}</Route>
      <Route path="/sign-up">{authToken !== undefined ? <Redirect to="/" /> : <RegisterForm />}</Route>
      <Route path="/confirmation">{authToken !== undefined ? <Redirect to="/" /> : <ConfirmationForm />}</Route>
      <Layout>
        <BasePage />
      </Layout>
    </Switch>
  );
}
