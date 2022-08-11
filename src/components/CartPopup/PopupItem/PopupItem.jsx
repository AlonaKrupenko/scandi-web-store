import React from "react";
import ColorsOptionsPicker from "../../OptionsPicker/ColorsOptionsPicker";
import OptionsPicker from "../../OptionsPicker/OptionsPicker";
import QuantitySelector from "../../QuantitySelector/QuantitySelector";
import "./style.css";

class PopupItem extends React.Component {
  changeQuantity = (quantity) => {
    this.props.onChangeQuantity(this.props.data.id, quantity);
  };

  changeAttribute = (attributeId) => (value) => {
    this.props.onChangeAttribute(this.props.data.id, attributeId, value);
  };

  render() {
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
                  value={this.props.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.changeAttribute(el.id)}
                />
              ) : (
                <ColorsOptionsPicker
                  className="cart-popup"
                  key={el.id}
                  value={this.props.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.changeAttribute(el.id)}
                />
              );
            })}
          </div>
        </div>

        <QuantitySelector
          className="small-cart-qnt-selector"
          size="small"
          value={this.props.data.quantity}
          onChange={this.changeQuantity}
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
