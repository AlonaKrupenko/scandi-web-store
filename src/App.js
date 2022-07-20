import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard";

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
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        {data.map((el) => {
          return (
            <ProductCard img={el.img} price={el.price} inStock={el.inStock} />
          );
        })}
      </div>
    );
  }
}

export default App;
