import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ConnectedHeader from "./components/Header/Header";
import ConnectedProductListWithRouter from "./routes/ProductList/ProductList";
import ConnectedProductDescriptionWithRouter from "./routes/ProductDescription/ProductDescription";
import ConnectedCart from "./routes/Cart/Cart";
import { store } from "./redux/store";
import { Provider } from "react-redux";

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
        <Router>
          <div className="App">
            <ConnectedHeader />
            <Switch>
              <Route exact path="/cart">
                <ConnectedCart />
              </Route>
              <Route exact path="/:name">
                <ConnectedProductListWithRouter />
              </Route>
              <Route path="/:name/:id">
                <ConnectedProductDescriptionWithRouter />
              </Route>
              <Route path="/">
                <Redirect to="/all" />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
