import React from "react";
import "./style.css";
import NavWithApolloWithRouter from "./Nav/NavTabs";
import { ReactComponent as Logo } from "../../assets/store_logo.svg";
import { ReactComponent as Cart } from "../../assets/cart_pic.svg";
import ConnectedCartPopup from "./../CartPopup/CartPopup";
import { connect } from "react-redux";

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
              <p style={{ margin: "0" }}>{this.props.quantity}</p>
            </div>

            {this.state.isCartVisible ? (
              <ConnectedCartPopup onClose={this.hideCart} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    quantity: state.cart.list.length,
  };
};

const ConnectedHeader = connect(mapStateToProps, null)(Header);

export default ConnectedHeader;
