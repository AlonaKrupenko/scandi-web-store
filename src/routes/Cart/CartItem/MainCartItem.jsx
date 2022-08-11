import React from "react";
import ColorsOptionsPicker from "../../../components/OptionsPicker/ColorsOptionsPicker";
import OptionsPicker from "../../../components/OptionsPicker/OptionsPicker";
import QuantitySelector from "../../../components/QuantitySelector/QuantitySelector";
import "./style.css";

import { ReactComponent as BtnRight } from "../../../assets/cart_btn_right.svg";
import { ReactComponent as BtnLeft } from "../../../assets/cart_btn_left.svg";

class MainCartItem extends React.Component {
  changeQuantity = (quantity) => {
    this.props.onChangeQuantity(this.props.data.id, quantity);
  };

  changeAttribute = (attributeId) => (value) => {
    this.props.onChangeAttribute(this.props.data.id, attributeId, value);
  };
  render() {
    console.log(this.props.data, "data in Cart Item");
    return (
      <div className="main-cart-item-wrapper">
        <div className="main-cart-description-block">
          <div>
            <h3 className="main-cart-heading">
              {this.props.data.product.brand}
            </h3>
            <p className="main-cart-name">{this.props.data.product.name}</p>
            <p className="main-cart-price">
              {this.props.data.product.prices[0].currency.symbol +
                this.props.data.product.prices[0].amount}
            </p>
          </div>
          <div>
            {this.props.data.product.attributes.map((el) => {
              return el.id !== "Color" ? (
                <OptionsPicker
                  // className="main-cart"
                  key={el.id}
                  value={this.props.data.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.changeAttribute(el.id)}
                />
              ) : (
                <ColorsOptionsPicker
                  // className="main-cart"
                  key={el.id}
                  value={this.props.data.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.changeAttribute(el.id)}
                />
              );
            })}
          </div>
        </div>
        <div className="main-cart-control-block">
          <QuantitySelector
            className="main-cart-qnt-selector"
            size="main"
            value={this.props.data.quantity}
            onChange={this.changeQuantity}
          />
          <div className="main-cart-img-wrapper">
            <img
              className="main-cart-img"
              src={this.props.data.product.gallery[0]}
              alt=""
            />
            <div className="switch-btn-block">
              <BtnLeft style={{ marginRight: "8px", cursor: "pointer" }} />
              <BtnRight style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCartItem;
