import React from "react";
import "./style.css";
import cn from "classnames";
import OptionsPicker from "../../components/OptionsPicker/OptionsPicker";
import ColorsOptionsPicker from "../../components/OptionsPicker/ColorsOptionsPicker";
// import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT } from "../../graphQL/Queries";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cartSlice } from "./../../redux/cart";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../App";

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: "",
      product: {},
      selectedAttributes: {},
    };
  }

  fetchProductDescription = (productId) => {
    client
      .query({
        query: GET_PRODUCT,
        variables: {
          productId,
        },
      })
      .then((res) => {
        const selectedAttributes = res.data.product.attributes.reduce(
          (acc, item) => {
            return { ...acc, [item.id]: item.items[0].value };
          },
          {}
        );

        console.log(selectedAttributes);

        this.setState({
          product: res.data.product,
          selectedAttributes,
        });
      });
  };

  componentDidMount() {
    this.fetchProductDescription(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchProductDescription(this.props.match.params.id);
    }
  }

  addValue = (value) => {
    this.setState({ selectedValue: value });
  };
  addColorValue = (value) => {
    this.setState({ selectedColorValue: value });
  };

  showImg = (e) => {
    this.setState({ selectedPhoto: e.target.src });
  };

  onChangeAttribute = (attributeId) => (value) => {
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attributeId]: value,
      },
    });
  };

  onAddToCart = () => {
    this.props.dispatch(
      cartSlice.actions.addItem({
        product: this.state.product,
        quantity: 1,
        id: uuidv4(),
        selectedAttributes: this.state.selectedAttributes,
      })
    );
  };

  render() {
    const productData = this.state.product;

    if (productData) {
      localStorage.setItem("product", JSON.stringify(productData));
    }

    const btnClasses = cn("btn-add", {
      "not-available": !productData?.inStock,
    });

    return (
      <div className="description-block">
        <div className="img-block">
          <div className="preview-block">
            {productData?.gallery?.map((el, index) => {
              return (
                <img
                  className="preview-img"
                  src={el}
                  alt=""
                  key={index}
                  onClick={this.showImg}
                />
              );
            })}
          </div>
          <div className="description-img-wrapper">
            <img
              className="description-main-img"
              src={
                this.state.selectedPhoto === ""
                  ? productData?.gallery?.[0]
                  : this.state.selectedPhoto
              }
              alt=""
            />
          </div>
        </div>
        <div className="description-content">
          <h2 className="heading">{productData?.brand}</h2>
          <p className="name">{productData?.name}</p>
          <div>
            {productData?.attributes?.map((el) => {
              return el.id !== "Color" ? (
                <OptionsPicker
                  key={el.id}
                  value={this.state.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.onChangeAttribute(el.id)}
                />
              ) : (
                <ColorsOptionsPicker
                  key={el.id}
                  value={this.state.selectedAttributes[el.id]}
                  title={el.id}
                  options={el.items}
                  onSelect={this.onChangeAttribute(el.id)}
                />
              );
            })}
          </div>
          <p className="price-heading">PRICE</p>
          <p className="price">
            {productData?.prices?.[0].currency.symbol +
              productData?.prices?.[0].amount}
          </p>
          <button
            className={btnClasses}
            onClick={this.onAddToCart}
            disabled={!productData?.inStock}
          >
            ADD TO CART
          </button>
          <p className="text">{productData?.description}</p>
        </div>
      </div>
    );
  }
}

// const ProductDescriptionWithApollo = graphql(GET_PRODUCT, {
//   options: (props) => {
//     return {
//       variables: {
//         productId: props.match.params.id,
//       },
//     };
//   },
// })(ProductDescription);

const ProductDescriptionWithApolloWithRouter = withRouter(ProductDescription);

const mapStateToProps = (state, ownProps) => {
  return {
    quantity: state.cart.list.length,
  };
};

const ConnectedProductDescriptionWithApolloWithRouter = connect(
  mapStateToProps,
  null
)(ProductDescriptionWithApolloWithRouter);

export default ConnectedProductDescriptionWithApolloWithRouter;
