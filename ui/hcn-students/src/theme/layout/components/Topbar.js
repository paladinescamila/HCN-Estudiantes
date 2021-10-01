import React from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";

export default function Topbar(studentName) {
  return (
    <div className="headerbar">
      <Header />
      <hr className="breakLine-top" />
      <SubHeader />
    </div>
  );
}
/* Topbar section */
