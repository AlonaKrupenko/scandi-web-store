import React from "react";
import "./style.css";
import cn from "classnames";
import OptionsPicker from "../../components/OptionsPicker/OptionsPicker";
import ColorsOptionsPicker from "../../components/OptionsPicker/ColorsOptionsPicker";
import { GET_PRODUCT } from "../../graphQL/Queries";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cartSlice } from "./../../redux/cart";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../App";
import getPrice from "./../../helpers/getPrice";
import NotFound from "../NotFound/NotFound";
import sanitizeHtml from "sanitize-html";
import { ReactComponent as BtnRight } from "../../assets/cart_btn_right.svg";

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedPhoto: "",
      product: {},
      selectedAttributes: {},
      notFound: false,
    };
  }

  fetchProductDescription = (productId) => {
    this.setState({ loading: true });
    client
      .query({
        query: GET_PRODUCT,
        variables: {
          productId,
        },
      })
      .then((res) => {
        if (res.data.product) {
          const selectedAttributes = res.data.product.attributes.reduce(
            (acc, item) => {
              return { ...acc, [item.id]: item.items[0].value };
            },
            {}
          );

          this.setState({
            product: res.data.product,
            selectedAttributes,
            loading: false,
            notFound: false,
          });
        } else {
          this.setState({ notFound: true, loading: false });
        }
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
    if (this.state.loading) {
      return null;
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    const productData = this.state.product;

    const btnClasses = cn("btn-add", {
      "not-available": !productData.inStock,
    });

    return (
      <div className="description-block">
        <div className="img-block">
          <div className="preview-block">
            {productData.gallery.map((el, index) => {
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
                  ? productData.gallery[0]
                  : this.state.selectedPhoto
              }
              alt=""
            />
          </div>
        </div>
        <div className="description-content">
          <h2 className="heading">{productData.brand}</h2>
          <p className="name">{productData.name}</p>
          <div>
            {productData.attributes.map((el) => {
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
            {getPrice(productData, this.props.selectedCurrency).currency
              .symbol +
              getPrice(productData, this.props.selectedCurrency).amount.toFixed(
                2
              )}
          </p>
          <button
            className={btnClasses}
            onClick={this.onAddToCart}
            disabled={!productData.inStock}
          >
            ADD TO CART
          </button>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(productData.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const ProductDescriptionWithRouter = withRouter(ProductDescription);

const mapStateToProps = (state, ownProps) => {
  return {
    quantity: state.cart.list.length,
    selectedCurrency: state.currency.selectedCurrency,
  };
};

const ConnectedProductDescriptionWithRouter = connect(
  mapStateToProps,
  null
)(ProductDescriptionWithRouter);

export default ConnectedProductDescriptionWithRouter;
