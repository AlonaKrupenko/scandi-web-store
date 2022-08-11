import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import "./style.css";
// import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORY } from "../../graphQL/Queries";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cartSlice } from "./../../redux/cart";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../App";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      category: {},
    };
  }

  fetchProducts = (categoryName) => {
    client
      .query({
        query: GET_CATEGORY,
        variables: {
          categoryName,
        },
      })
      .then((res) => {
        this.setState({
          productList: res.data.category.products,
          category: res.data.category,
        });
      });
  };

  componentDidMount() {
    this.fetchProducts(this.props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.fetchProducts(this.props.match.params.name);
    }
  }

  addToCart = (id) => {
    const product = this.state.productList.find((el) => {
      return el.id === id;
    });

    const selectedAttributes = product.attributes.reduce((acc, item) => {
      return { ...acc, [item.id]: item.items[0].value };
    }, {});

    this.props.dispatch(
      cartSlice.actions.addItem({
        product,
        quantity: 1,
        id: uuidv4(),
        selectedAttributes,
      })
    );
  };

  render() {
    const allProducts = this.state.productList;
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">
          {this.state.category?.name?.toUpperCase()}
        </h1>
        <div className="product-list-cards-block">
          {allProducts?.map((el) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/${this.props.match.params.name}/${el.id}`}
                key={el.id}
              >
                <ProductCard
                  id={el.id}
                  onAdd={this.addToCart}
                  img={el.gallery[0]}
                  name={el.name}
                  priceSymb={el.prices[0].currency.symbol}
                  price={el.prices[0].amount}
                  inStock={el.inStock}
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

// const ProductListWithApollo = graphql(GET_CATEGORY, {
//   options: (props) => {
//     return {
//       variables: {
//         categoryName: props.match.params.name,
//       },
//       fetchPolicy: "no-cached",
//     };
//   },
// })(ProductList);

const ProductListWithApolloWithRouter = withRouter(ProductList);

const mapStateToProps = (state) => {
  return {
    dataList: state.cart.list,
  };
};

const ConnectedProductListWithApolloWithRouter = connect(
  mapStateToProps,
  null
)(ProductListWithApolloWithRouter);

export default ConnectedProductListWithApolloWithRouter;
