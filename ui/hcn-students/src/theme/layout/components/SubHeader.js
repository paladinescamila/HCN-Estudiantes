import React from "react";
import { toAbsoluteUrl } from "../../helpers";
import "../../css/SubHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actions } from "../../../app/modules/Courses/redux/coursesRedux";
import { actions as actionsActivity } from "../../../app/modules/ActivitySelected/redux/activityRedux";

export default function SubHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentCourse } = useSelector((actions) => actions.course);

  const goToCoursesWidget = () => {
    dispatch(actions.setCurrentCourse(undefined));
    dispatch(actionsActivity.cleanActivity());
    history.push("courses");
  };

  return (
    /* Subheader */
    <div>
      {currentCourse !== undefined ? (
        <div id="second-row" className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm" align="left">
              <img src={toAbsoluteUrl("/media/logos/logoPuj.png")} alt="logoPuj" className="navbar--logo-puj" />
            </div>
            <div className="col-sm text-center" vertical-align="middle">
              {currentCourse.name !== undefined ? currentCourse.name : ""}
            </div>
            <div className="col-sm mr-2" align="right">
              <button
                href="#"
                style={{
                  background: "transparent",
                  border: "none",
                  margin: "0",
                }}
                className="button-header"
                onClick={() => goToCoursesWidget()}
              >
                Mis cursos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div id="second-row" className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm" align="left" />
            <div className="col-sm text-center mt-3" vertical-align="middle" style={{ fontSize: "17px" }}>
              Mis cursos
            </div>
            <div className="col-sm mr-2" align="right" />
          </div>
        </div>
      )}
    </div>
  );
}
