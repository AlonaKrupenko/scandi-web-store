import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./style.css";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORY } from "../../graphQL/Queries";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class ProductList extends React.Component {
  render() {
    const allProducts = this.props.data.category?.products;
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">
          {this.props.data.category?.name.toUpperCase()}
        </h1>
        <div className="product-list-cards-block">
          {allProducts?.map((el) => {
            return (
              <Link
                to={`/${this.props.match.params.name}/${el.id}`}
                key={el.id}
              >
                <ProductCard
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

const ProductListWithApollo = graphql(GET_CATEGORY, {
  options: (props) => {
    return {
      variables: {
        categoryName: props.match.params.name,
      },
    };
  },
})(ProductList);

const ProductListWithApolloWithRouter = withRouter(ProductListWithApollo);

export default ProductListWithApolloWithRouter;
