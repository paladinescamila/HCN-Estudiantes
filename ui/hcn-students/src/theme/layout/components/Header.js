import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { toAbsoluteUrl } from "../../helpers";
import "../../css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../app/modules/Auth/_redux/authRedux";
import { actions as actionsCourses } from "../../../app/modules/Courses/redux/coursesRedux";
import { useHistory } from "react-router-dom";

export default function Header() {
  const { userName } = useSelector((actions) => actions.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const Logout = () => {
    dispatch(actionsCourses.cleanCourses());
    dispatch(actions.logout());
    history.push("sign-in");
  };

  return (
    <div>
      <Navbar inverse="true" collapseOnSelect>
        <Navbar.Brand>
          <img src={toAbsoluteUrl("/media/logos/logoApp.png")} alt="logoApp" className="navbar--logo-app" />
          <span id="name-app" className="mb-0 h1" style={{ paddingLeft: "5px" }}>
            Simulador de HCN's
          </span>
        </Navbar.Brand>

        <Nav className="ml-auto">
          <NavDropdown eventkey={1} title={userName !== undefined ? userName : ""} id="basic-nav-dropdown">
            <NavDropdown.Item eventkey="1.1" id="nav-item" onClick={() => Logout()}>
              Salir
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}
