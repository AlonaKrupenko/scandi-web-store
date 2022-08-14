import React from "react";
import "./style.css";
import PopupItem from "./PopupItem/PopupItem";
import { connect } from "react-redux";
import { cartSlice } from "../../redux/cart";
import { Link } from "react-router-dom";
import getPrice from "./../../helpers/getPrice";
import getCartTotal from "../../helpers/getCartTotal";

class CartPopup extends React.Component {
  onClose = (e) => {
    e.stopPropagation();
    this.props.onClose();
  };

  onChangeAttribute = (cartItemId, attributeId, attributeValue) => {
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
                  priceSymb={
                    getPrice(el.product, this.props.selectedCurrency).currency
                      .symbol
                  }
                  price={
                    getPrice(el.product, this.props.selectedCurrency).amount
                  }
                  onChangeQuantity={this.onChangeQuantity}
                  onChangeAttribute={this.onChangeAttribute}
                />
              );
            })}
          </div>
          <div className="small-cart-footer">
            <div className="small-cart-total">
              <p className="small-cart-total-text">Total</p>
              <p className="small-cart-total-text">
                {getCartTotal(this.props.dataList, this.props.selectedCurrency)}
              </p>
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
    quantity: state.cart.list.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0),
    dataList: state.cart.list,
    selectedCurrency: state.currency.selectedCurrency,
  };
};

const ConnectedCartPopup = connect(mapStateToProps, null)(CartPopup);

export default ConnectedCartPopup;
