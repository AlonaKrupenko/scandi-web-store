import React from "react";
import "./App.css";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Header from "./components/Header/Header";
import ProductList from "./routes/ProductList/ProductList";
import ProductDescription from "./routes/ProductDescription/ProductDescription";

const data = [
  {
    inStock: true,
    img: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    price: "50",
  },
  {
    inStock: false,
    img: "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
    price: "75",
  },
  {
    inStock: false,
    img: "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
    price: "105",
  },
  {
    inStock: false,
    img: "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
    price: "105",
  },
  {
    inStock: true,
    img: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    price: "50",
  },
  {
    inStock: false,
    img: "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
    price: "75",
  },
];

const options = [
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "43", value: "43" },
];

const colors = [
  { label: "Green", value: "#44FF03" },
  { label: "Cyan", value: "#03FFF7" },
  { label: "Blue", value: "#030BFF" },
  { label: "Black", value: "#000000" },
  { label: "White", value: "#FFFF99" },
];

const fullData = {
  id: "",
  name: "",
  inStock: true,
  gallery: ["", ""],
  description: "",
  category: "",
  attributes: [
    // {
    //   id: "",
    //   name: "",
    //   type: "",
    //   items: [
    //     {
    //       displayValue: "",
    //       value: "",
    //       id: "",
    //     },
    //   ],
    // },
  ],
  prices: [
    {
      currency: "",
      amount: +"",
    },
  ],
  brand: "",
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <ProductList data={data} />
            </Route>
            <Route path="/description">
              <ProductDescription colors={colors} options={options} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
