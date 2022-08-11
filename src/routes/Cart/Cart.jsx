import React from "react";
import MainCartItem from "./CartItem/MainCartItem";
import { connect } from "react-redux";
import { cartSlice } from "../../redux/cart";
import "./style.css";

class Cart extends React.Component {
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
        <h1 className="page-cart-title" style={{ marginTop: "80px" }}>
          CART
        </h1>
        {this.props.dataList.map((el) => {
          return (
            <MainCartItem
              data={el}
              key={el.id}
              onChangeQuantity={this.onChangeQuantity}
              onChangeAttribute={this.onChangeAttribute}
            />
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.cart.list,
  };
};

const ConnectedCart = connect(mapStateToProps, null)(Cart);

export default ConnectedCart;
