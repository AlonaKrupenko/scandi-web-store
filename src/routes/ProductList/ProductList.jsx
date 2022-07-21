import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./style.css";

class ProductList extends React.Component {
  render() {
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">Category name</h1>
        <div className="product-list-cards-block">
          {this.props.data.map((el) => {
            return (
              <ProductCard img={el.img} price={el.price} inStock={el.inStock} />
            );
          })}
        </div>
      </div>
    );
  }
}
export default ProductList;
