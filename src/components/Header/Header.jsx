import React from "react";
import "./style.css";
import NavWithApolloWithRouter from "./Nav/NavTabs";
import { ReactComponent as Logo } from "../../assets/store_logo.svg";
import { ReactComponent as Cart } from "../../assets/cart_pic.svg";
import CartPopup from "./../CartPopup/CartPopup";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false,
    };
  }

  showCart = (e) => {
    this.setState({ isCartVisible: true });
  };
  hideCart = () => {
    this.setState({ isCartVisible: false });
  };

  render() {
    return (
      <div className="header">
        <div className="nav">
          <NavWithApolloWithRouter />
          <Logo className="logo-img" />
          <div className="cart-wrapper" onClick={this.showCart}>
            <Cart className="cart-icon" />
            <div className="cart-indicator">
              <p style={{ margin: "0" }}>{this.props.value}</p>
            </div>
            {this.state.isCartVisible ? (
              <CartPopup onClose={this.hideCart} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
