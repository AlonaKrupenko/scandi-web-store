import React from "react";
import "./style.css";
import NavWithRouter from "./Nav/NavTabs";
import { ReactComponent as Logo } from "../../assets/store_logo.svg";
import { ReactComponent as Cart } from "../../assets/cart_pic.svg";
import ConnectedCartPopup from "./../CartPopup/CartPopup";
import ConnectedCurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false,
    };
  }

  showCart = () => {
    this.setState({ isCartVisible: true });
  };
  hideCart = () => {
    this.setState({ isCartVisible: false });
  };

  render() {
    return (
      <div className="header">
        <div className="nav">
          <NavWithRouter />
          <Logo className="logo-img" />
          <div className="dropdown-icons-wrapper">
            <ConnectedCurrencyDropdown className="" />
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    quantity: state.cart.list.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0),
  };
};

const ConnectedHeader = connect(mapStateToProps, null)(Header);

export default ConnectedHeader;
