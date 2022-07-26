import React from "react";
import "./style.css";
import OptionsPicker from "../../components/OptionsPicker/OptionsPicker";
import ColorsOptionsPicker from "../../components/OptionsPicker/ColorsOptionsPicker";

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
    return (
      <div className="description-block">
        <div className="img-block">
          <div className="preview-block">
            <img
              className="preview-img"
              src="https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg"
              alt=""
            />
            <img
              className="preview-img"
              src="https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg"
              alt=""
            />
            <img
              className="preview-img"
              src="https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="img-wrapper">
            <img
              className="main-img"
              src="https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="description-content">
          <h2 className="heading">Apollo</h2>
          <p className="name">Running Shorts</p>
          <OptionsPicker
            value={this.state.selectedValue}
            title="SIZE"
            options={this.props.options}
            onSelect={this.addValue}
          />
          <ColorsOptionsPicker
            value={this.state.selectedColorValue}
            title="COLOR"
            options={this.props.colors}
            onSelect={this.addColorValue}
          />
          <p className="price-heading">PRICE</p>
          <p className="price">$50</p>
          <button className="btn-add">ADD TO CART</button>
          <p className="text">
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </p>
        </div>
      </div>
    );
  }
}

export default ProductDescription;
