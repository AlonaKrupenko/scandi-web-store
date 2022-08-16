import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import "./style.css";
import { GET_CATEGORY } from "../../graphQL/Queries";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cartSlice } from "./../../redux/cart";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../App";
import getPrice from "./../../helpers/getPrice";
import NotFound from "../NotFound/NotFound";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      category: {},
      loading: true,
      notFound: false,
    };
  }

  fetchProducts = (categoryName) => {
    this.setState({ loading: true });
    client
      .query({
        query: GET_CATEGORY,
        variables: {
          categoryName,
        },
      })
      .then((res) => {
        if (res.data.category) {
          this.setState({
            productList: res.data.category.products,
            category: res.data.category,
            loading: false,
            notFound: false,
          });
        } else {
          this.setState({ notFound: true, loading: false });
        }
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
    if (this.state.loading) {
      return null;
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    const allProducts = this.state.productList;
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">
          {this.state.category.name.toUpperCase()}
        </h1>
        <div className="product-list-cards-block">
          {allProducts.map((el) => {
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
                  priceSymb={
                    getPrice(el, this.props.selectedCurrency).currency.symbol
                  }
                  price={getPrice(el, this.props.selectedCurrency).amount}
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
    selectedCurrency: state.currency.selectedCurrency,
  };
};

const ConnectedProductListWithApolloWithRouter = connect(
  mapStateToProps,
  null
)(ProductListWithApolloWithRouter);

export default ConnectedProductListWithApolloWithRouter;
