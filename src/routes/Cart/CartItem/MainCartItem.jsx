import React from "react";
import ColorsOptionsPicker from "../../../components/OptionsPicker/ColorsOptionsPicker";
import OptionsPicker from "../../../components/OptionsPicker/OptionsPicker";
import QuantitySelector from "../../../components/QuantitySelector/QuantitySelector";
import "./style.css";
import cn from "classnames";

import { ReactComponent as BtnRight } from "../../../assets/cart_btn_right.svg";
import { ReactComponent as BtnLeft } from "../../../assets/cart_btn_left.svg";

class MainCartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: 0,
    };
  }
  changeQuantity = (quantity) => {
    this.props.onChangeQuantity(this.props.data.id, quantity);
  };

  changeAttribute = (attributeId) => (value) => {
    this.props.onChangeAttribute(this.props.data.id, attributeId, value);
  };

  switchPhoto = (type) => () => {
    if (type === "next") {
      this.state.currentPhoto < this.props.data.product.gallery.length - 1
        ? this.setState({ currentPhoto: this.state.currentPhoto + 1 })
        : this.setState({ currentPhoto: 0 });
    } else {
      this.state.currentPhoto > 0
        ? this.setState({ currentPhoto: this.state.currentPhoto - 1 })
        : this.setState({
            currentPhoto: this.props.data.product.gallery.length - 1,
          });
    }
  };

  render() {
    const switchBtnClass = cn("switch-btn-block", {
      "not-visible": this.props.data.product.gallery.length === 1,
    });

    return (
      <div className="main-cart-item-wrapper">
        <div className="main-cart-description-block">
          <div>
            <h3 className="main-cart-heading">
              {this.props.data.product.brand}
            </h3>
            <p className="main-cart-name">{this.props.data.product.name}</p>
            <p className="main-cart-price">
              {this.props.priceSymb + this.props.price}
            </p>
          </div>
          <div>
            {this.props.data.product.attributes.map((el) => {
              return el.id !== "Color" ? (
                <OptionsPicker
                  key={el.id}
                  value={this.props.data.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.changeAttribute(el.id)}
                />
              ) : (
                <ColorsOptionsPicker
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
              src={this.props.data.product.gallery[this.state.currentPhoto]}
              alt=""
            />
            <div className={switchBtnClass}>
              <BtnLeft
                style={{ marginRight: "8px", cursor: "pointer" }}
                onClick={this.switchPhoto("previous")}
              />
              <BtnRight
                style={{ cursor: "pointer" }}
                onClick={this.switchPhoto("next")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCartItem;
