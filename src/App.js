import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./components/Header/Header";
import ProductListWithApolloWithRouter from "./routes/ProductList/ProductList";
import ProductDescriptionWithApolloWithRouter from "./routes/ProductDescription/ProductDescription";
// import QuantitySelector from "./components/QuantitySelector/QuantitySelector";

// const fullData = {
//   id: "",
//   name: "",
//   inStock: true,
//   gallery: ["", ""],
//   description: "",
//   category: "",
//   attributes: [
//     // {
//     //   id: "",
//     //   name: "",
//     //   type: "",
//     //   items: [
//     //     {
//     //       displayValue: "",
//     //       value: "",
//     //       id: "",
//     //     },
//     //   ],
//     // },
//   ],
//   prices: [
//     {
//       currency: "",
//       amount: +"",
//     },
//   ],
//   brand: "",
// };

// const cartSize = "small";
const itemValue = 12;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

class App extends React.Component {
  changeValue = (value) => {
    console.log(value);
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Header value={itemValue} />
            <Switch>
              <Route exact path="/:name">
                <ProductListWithApolloWithRouter />
              </Route>
              <Route path="/:name/:id">
                <ProductDescriptionWithApolloWithRouter />
              </Route>
            </Switch>
          </div>
        </Router>
        {/* <QuantitySelector
          size={cartSize}
          value={itemValue}
          onChange={this.changeValue}
        /> */}
      </ApolloProvider>
    );
  }
}

export default App;
