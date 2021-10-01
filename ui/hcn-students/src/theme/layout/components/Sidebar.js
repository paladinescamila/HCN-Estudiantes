import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../css/Sidebar.css";
import { useHistory, withRouter } from "react-router-dom";

export function Sidebar() {
  const { currentCourse } = useSelector((state) => state.course);
  const history = useHistory();
  const { id } = useSelector((state) => state.activity);

  const pushToHistory = (path) => {
    history.push(path);
  };

  return (
    <div>
      {currentCourse !== undefined && id === undefined ? (
        <div className="sidenav d-flex flex-column flex-row-auto">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li className="TopPad">
              <Nav.Link onClick={() => pushToHistory("/announcements")}>Anuncios</Nav.Link>
            </li>
            <hr className="breakLine" />
            <li className="bottomPad">
              <Nav.Link onClick={() => pushToHistory("/activities")}>Actividades</Nav.Link>
            </li>
            <li>
              <Nav.Link onClick={() => pushToHistory("/feedbacks")}>Retroalimentación</Nav.Link>
            </li>
            <hr className="breakLine" />
          </ul>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default withRouter(Sidebar);
