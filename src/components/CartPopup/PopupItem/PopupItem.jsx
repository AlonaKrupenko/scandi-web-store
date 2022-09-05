import React from "react";
import ColorsOptionsPicker from "../../OptionsPicker/ColorsOptionsPicker";
import OptionsPicker from "../../OptionsPicker/OptionsPicker";
import QuantitySelector from "../../QuantitySelector/QuantitySelector";
import "./style.css";

class PopupItem extends React.Component {
  changeQuantity = (quantity) => {
    this.props.onChangeQuantity(this.props.data.id, quantity);
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
              {this.props.priceSymb + this.props.price}
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
                />
              ) : (
                <ColorsOptionsPicker
                  className="cart-popup"
                  key={el.id}
                  value={this.props.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
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
