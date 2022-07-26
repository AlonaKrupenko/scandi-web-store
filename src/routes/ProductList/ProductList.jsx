import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./style.css";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORY } from "../../graphQL/Queries";

class ProductList extends React.Component {
  render() {
    const allProducts = this.props.data.category?.products;
    console.log(allProducts);
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">All</h1>
        <div className="product-list-cards-block">
          {allProducts?.map((el) => {
            return (
              <ProductCard
                key={el.id}
                img={el.gallery[0]}
                name={el.name}
                priceSymb={el.prices[0].currency.symbol}
                price={el.prices[0].amount}
                inStock={el.inStock}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const ListWithApollo = graphql(GET_CATEGORY)(ProductList);

export default ListWithApollo;
