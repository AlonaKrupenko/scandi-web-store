import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./components/Header/Header";
import ProductListWithApolloWithRouter from "./routes/ProductList/ProductList";
import ProductDescriptionWithApolloWithRouter from "./routes/ProductDescription/ProductDescription";

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Header />
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
      </ApolloProvider>
    );
  }
}

export default App;
