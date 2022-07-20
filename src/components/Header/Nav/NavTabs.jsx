import React from "react";
import "./style.css";

class NavTabs extends React.Component {
  render() {
    return (
      <ul className="nav-list">
        <li className="nav-link">WOMEN</li>
        <li className="nav-link">MEN</li>
        <li className="nav-link">KIDS</li>
      </ul>
    );
  }
}

export default NavTabs;
