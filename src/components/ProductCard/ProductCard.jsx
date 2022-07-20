import React from "react";
import "./style.css";
import { ReactComponent as AddToCart } from "../../assets/add_to_cart.svg";
import cn from "classnames";

class ProductCard extends React.Component {
  render() {
    const cardTitleClasses = cn("product-name", {
      "out-of-stock": !this.props.inStock,
    });
    const cardPriceClasses = cn("product-price", {
      "out-of-stock": !this.props.inStock,
    });
    const wrapperClasses = cn("img-overlay", {
      "non-visible-wrapper": this.props.inStock,
    });
    const wrapperTextClasses = cn("out-of-stock-text", {
      "non-visible": this.props.inStock,
    });
    const addToCartClasses = cn("add-to-cart-btn", {
      "non-visible": !this.props.inStock,
    });

    return (
      <div className="product-card">
        <div className="img-wraper">
          <img className="product-img" src={this.props.img} alt="pic" />
          <div className={wrapperClasses}>
            <p className={wrapperTextClasses}>OUT OF STOCK</p>
          </div>
        </div>
        <AddToCart className={addToCartClasses} />
        <div className="product-info">
          <h3 className={cardTitleClasses}>Apollo Running Short</h3>
          <p className={cardPriceClasses}>${this.props.price}</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
