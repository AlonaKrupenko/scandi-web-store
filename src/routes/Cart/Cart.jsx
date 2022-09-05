import React from "react";
import MainCartItem from "./CartItem/MainCartItem";
import { connect } from "react-redux";
import { cartSlice } from "../../redux/cart";
import "./style.css";
import getPrice from "./../../helpers/getPrice";
import getCartTotal from "./../../helpers/getCartTotal";

class Cart extends React.Component {
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
              priceSymb={
                getPrice(el.product, this.props.selectedCurrency).currency
                  .symbol
              }
              price={getPrice(
                el.product,
                this.props.selectedCurrency
              ).amount.toFixed(2)}
              key={el.id}
              onChangeQuantity={this.onChangeQuantity}
            />
          );
        })}
        <div className="total-block">
          <div className="grid-block">
            <div className="total-name">Tax 21%: </div>
            <div className="total-value">
              {this.props.selectedCurrency.symbol +
                (
                  getCartTotal(
                    this.props.dataList,
                    this.props.selectedCurrency
                  ) * 0.21
                ).toFixed(2)}
            </div>

            <div className="total-name">Quantity: </div>
            <div className="total-value">{this.props.quantity}</div>

            <div className="total-name total">Total: </div>
            <div className="total-value">
              {this.props.selectedCurrency.symbol +
                getCartTotal(this.props.dataList, this.props.selectedCurrency)}
            </div>
          </div>

          <button className="page-cart-btn">ORDER</button>
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

const ConnectedCart = connect(mapStateToProps, null)(Cart);

export default ConnectedCart;
