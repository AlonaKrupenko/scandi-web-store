import React from "react";
import "./style.css";
import PopupItem from "../PopupItem.jsx/PopupItem";

class CartPopup extends React.Component {
  onClose = (e) => {
    e.stopPropagation();
    this.props.onClose();
  };

  render() {
    const cartItemData = {
      product: JSON.parse(localStorage.getItem("product")),
      quantity: 1,
      selectedAttributes: {},
    };

    return (
      <>
        <div className="wrapper" onClick={this.onClose}></div>
        <div className="small-cart">
          <p className="small-cart-title">
            <span>My Bag,</span>3 items
          </p>
          <div className="product-items-small-cart-wrapper">
            <PopupItem data={cartItemData} />
            <PopupItem data={cartItemData} />
            <PopupItem data={cartItemData} />
          </div>
          <div className="small-cart-footer">
            <div className="small-cart-total">
              <p className="small-cart-total-text">Total</p>
              <p className="small-cart-total-text">$200</p>
            </div>

            <div className="small-cart-btn-block">
              <button className="small-cart-btn cart-btn-view">
                VIEW CART
              </button>
              <button className="small-cart-btn cart-btn-checkout">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartPopup;
