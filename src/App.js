import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import ConnectedHeader from "./components/Header/Header";
import ConnectedProductListWithApolloWithRouter from "./routes/ProductList/ProductList";
import ConnectedProductDescriptionWithApolloWithRouter from "./routes/ProductDescription/ProductDescription";
import ConnectedCart from "./routes/Cart/Cart";
// import NotFound from "./routes/NotFound/NotFound";

// import QuantitySelector from "./components/QuantitySelector/QuantitySelector";
import { store } from "./redux/store";
import { Provider } from "react-redux";

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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <ConnectedHeader />
              <Switch>
                <Route exact path="/cart">
                  <ConnectedCart />
                </Route>
                <Route exact path="/:name">
                  <ConnectedProductListWithApolloWithRouter />
                </Route>
                <Route path="/:name/:id">
                  <ConnectedProductDescriptionWithApolloWithRouter />
                </Route>
                <Route path="/">
                  <Redirect to="/all" />
                </Route>
              </Switch>
            </div>
          </Router>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
