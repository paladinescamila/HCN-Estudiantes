import React from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import Activity from "./pages/activity/current-activities/Activity";
import ActivityDev from "./pages/activity_dev/ActivityDev";
import Announcement from "./pages/announcement/Announcement";
import EndActivity from "./pages/activity_dev/end-activity/EndActivity";
import LevelOneGeneralInfo from "./pages/forms/level-one/general-info/LevelOneGeneralInfoForm";
import { useSelector } from "react-redux";
import BasicFormOneItem from "./pages/forms/shared/BasicFormOneItem";
import LevelOneBiochemistryForm from "./pages/forms/level-one/biochemistry/LevelOneBiochemistryForm";
import CompletedActivity from "./pages/activity/completed-activities/CompletedActivity";
import LevelOneAnthoForm from "./pages/forms/level-one/Anthropometry/LevelOneAnthoForm";
import Course from "./pages/course/Course";

function BasePage() {
  const { authToken } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.activity);
  const { currentCourse } = useSelector((state) => state.course);

  return (
    <Switch>
      {authToken !== undefined ? (
        <Switch>
          <Redirect exact from="/" to="/courses" />
          <Route path="/courses">
            <Course />
          </Route>
          {currentCourse !== undefined ? (
            <Switch>
              <Route path="/announcements">
                <Announcement />
              </Route>
              <Route path="/activities">
                <Activity />
              </Route>
              <Route path="/feedbacks">
                <CompletedActivity />
              </Route>
              {id !== undefined ? (
                <Switch>
                  <Route path="/activity">
                    <ActivityDev />
                  </Route>
                  <Route path="/anthropometry">
                    <LevelOneAnthoForm />
                  </Route>
                  <Route path="/general-info">
                    <LevelOneGeneralInfo />
                  </Route>
                  <Route path="/biochemistry">
                    <LevelOneBiochemistryForm />
                  </Route>
                  <Route path="/consultation-reason">
                    <BasicFormOneItem section="Consultation" />
                  </Route>
                  <Route path="/diagnosis">
                    <BasicFormOneItem section="Diagnosis" />
                  </Route>
                  <Route path="/treatment">
                    <BasicFormOneItem section="Treatment" />
                  </Route>
                  <Route path="/activity-completed">
                    <EndActivity />
                  </Route>
                  <Redirect to="/error/404" />
                </Switch>
              ) : (
                <Redirect to="/activities" />
              )}
              <Redirect to="/error/404" />
            </Switch>
          ) : (
            <Redirect to="/courses" />
          )}
          <Redirect to="/error/404" />
        </Switch>
      ) : (
        <Redirect to="/sign-in" />
      )}
    </Switch>
  );
}

export default withRouter(BasePage);
