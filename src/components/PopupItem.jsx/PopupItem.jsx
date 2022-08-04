import React from "react";
import ColorsOptionsPicker from "../OptionsPicker/ColorsOptionsPicker";
import OptionsPicker from "../OptionsPicker/OptionsPicker";
import QuantitySelector from "./../QuantitySelector/QuantitySelector";
import "./style.css";

class PopupItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    console.log(this.props.data);

    return (
      <div className="item-wrapper">
        <div className="small-cart-description-block">
          <div>
            <h3 className="small-cart-heading">
              {this.props.data.product.brand}
            </h3>
            <p className="small-cart-name">{this.props.data.product.name}</p>
            <p className="small-cart-price">
              {this.props.data.product.prices[0].currency.symbol +
                this.props.data.product.prices[0].amount}
            </p>
          </div>
          <div>
            {this.props.data.product.attributes.map((el) => {
              return el.id !== "Color" ? (
                <OptionsPicker
                  className="cart-popup"
                  key={el.id}
                  // value={this.state.selectedValue}
                  title={el.id}
                  options={el.items}
                  // onSelect={this.addValue}
                />
              ) : (
                <ColorsOptionsPicker
                  className="cart-popup"
                  key={el.id}
                  // value={this.state.selectedColorValue}
                  title={el.id}
                  options={el.items}
                  // onSelect={this.addColorValue}
                />
              );
            })}
          </div>
        </div>

        <QuantitySelector
          className="small-cart-qnt-selector"
          size="small"
          value={this.props.data.quantity}
        />
        <div className="img-wrapper">
          <img
            className="img"
            src={this.props.data.product.gallery[0]}
            alt=""
          />
        </div>
      </div>
    );
  }
}
export default PopupItem;
