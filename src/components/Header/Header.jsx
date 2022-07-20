import React from "react";
import "./style.css";
import NavTabs from "./Nav/NavTabs";
import { ReactComponent as Logo } from "../../assets/store_logo.svg";
import { ReactComponent as Cart } from "../../assets/cart_pic.svg";

class Header extends React.Component {
  render() {
    return (
      <div className="nav">
        <NavTabs />
        <Logo />
        <Cart />
      </div>
    );
  }
}

export default Header;
