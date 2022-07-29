import React from "react";
import "./style.css";
import cn from "classnames";
import OptionsPicker from "../../components/OptionsPicker/OptionsPicker";
import ColorsOptionsPicker from "../../components/OptionsPicker/ColorsOptionsPicker";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT } from "../../graphQL/Queries";
import { withRouter } from "react-router-dom";

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      selectedColorValue: "",
    };
  }
  addValue = (value) => {
    this.setState({ selectedValue: value });
  };
  addColorValue = (value) => {
    this.setState({ selectedColorValue: value });
  };

  render() {
    const productData = this.props.data?.product;

    const btnClasses = cn("btn-add", {
      "not-available": !productData?.inStock,
    });

    return (
      <div className="description-block">
        <div className="img-block">
          <div className="preview-block">
            {productData?.gallery.map((el, index) => {
              return (
                <img className="preview-img" src={el} alt="" key={index} />
              );
            })}
          </div>
          <div className="img-wrapper">
            <img className="main-img" src={productData?.gallery[0]} alt="" />
          </div>
        </div>
        <div className="description-content">
          <h2 className="heading">{productData?.brand}</h2>
          <p className="name">{productData?.name}</p>
          <div>
            {productData?.attributes.map((el) => {
              return el.id !== "Color" ? (
                <OptionsPicker
                  key={el.id}
                  value={this.state.selectedValue}
                  title={el.id}
                  options={el.items}
                  onSelect={this.addValue}
                />
              ) : (
                <ColorsOptionsPicker
                  key={el.id}
                  value={this.state.selectedColorValue}
                  title={el.id}
                  options={el.items}
                  onSelect={this.addColorValue}
                />
              );
            })}
          </div>
          <p className="price-heading">PRICE</p>
          <p className="price">
            {productData?.prices[0].currency.symbol +
              productData?.prices[0].amount}
          </p>
          <button className={btnClasses}>ADD TO CART</button>
          <p className="text">{productData?.description}</p>
        </div>
      </div>
    );
  }
}

const ProductDescriptionWithApollo = graphql(GET_PRODUCT, {
  options: (props) => {
    return {
      variables: {
        productId: props.match.params.id,
      },
    };
  },
})(ProductDescription);

const ProductDescriptionWithApolloWithRouter = withRouter(
  ProductDescriptionWithApollo
);

export default ProductDescriptionWithApolloWithRouter;
