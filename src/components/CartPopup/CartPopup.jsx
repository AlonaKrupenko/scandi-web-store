import React from "react";
import "./style.css";
import PopupItem from "./PopupItem/PopupItem";
import { connect } from "react-redux";
import { cartSlice } from "../../redux/cart";
import { Link } from "react-router-dom";

class CartPopup extends React.Component {
  onClose = (e) => {
    e.stopPropagation();
    this.props.onClose();
  };

  onChangeAttribute = (cartItemId, attributeId, attributeValue) => {
    console.log(cartItemId, attributeId, attributeValue, "allProps popup");
    this.props.dispatch(
      cartSlice.actions.changeAttributes({
        cartItemId: cartItemId,
        attributeId: attributeId,
        attributeValue: attributeValue,
      })
    );
  };

  onChangeQuantity = (id, qnt) => {
    if (qnt) {
      this.props.dispatch(
        cartSlice.actions.changeQuantity({
          quantity: qnt,
          id: id,
        })
      );
    } else {
      this.props.dispatch(cartSlice.actions.deleteItem(id));
    }
  };

  render() {
    return (
      <>
        <div className="wrapper" onClick={this.onClose}></div>
        <div className="small-cart">
          <p className="small-cart-title">
            <span>My Bag,</span>
            {this.props.quantity} items
          </p>
          <div className="product-items-small-cart-wrapper">
            {this.props.dataList.map((el) => {
              return (
                <PopupItem
                  selectedAttributes={el.selectedAttributes}
                  data={el}
                  key={el.id}
                  onChangeQuantity={this.onChangeQuantity}
                  onChangeAttribute={this.onChangeAttribute}
                />
              );
            })}
          </div>
          <div className="small-cart-footer">
            <div className="small-cart-total">
              <p className="small-cart-total-text">Total</p>
              <p className="small-cart-total-text">$200</p>
            </div>

            <div className="small-cart-btn-block">
              <Link to="/cart" onClick={this.onClose}>
                <button className="small-cart-btn cart-btn-view">
                  VIEW CART
                </button>
              </Link>
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

const mapStateToProps = (state) => {
  return {
    quantity: state.cart.list.length,
    dataList: state.cart.list,
  };
};

const ConnectedCartPopup = connect(mapStateToProps, null)(CartPopup);

export default ConnectedCartPopup;
