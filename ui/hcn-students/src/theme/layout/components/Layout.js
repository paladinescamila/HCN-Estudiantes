import React from "react";
import "../../css/Layout.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export const Layout = ({ studentName, children }) => (
  <div className="FullLayout d-flex flex-column flex-row-fluid">
    <Topbar />
    <div id="bar" className="d-flex flex-column-fluid">
      <Sidebar />
      {children}
    </div>
  </div>
);
