import React from "react";
import "./style.css";
import cn from "classnames";
import { GET_CATEGORY_NAMES } from "../../../graphQL/Queries";
import { withRouter } from "react-router";
import { client } from "../../../App";

class NavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      loading: true,
    };
  }
  fetchProducts = (categoryName) => {
    this.setState({ loading: true });
    client
      .query({
        query: GET_CATEGORY_NAMES,
        variables: {
          categoryName,
        },
      })
      .then((res) => {
        this.setState({
          categoryList: res.data.categories,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchProducts(this.props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.fetchProducts(this.props.match.params.name);
    }
  }
  onCategoryClick = (category) => () => {
    this.props.history.push("/" + category);
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    const categories = this.state.categoryList;
    const currentCategory = this.props.location.pathname.split("/")[1];

    return (
      <ul className="nav-list">
        {categories.map((el) => {
          const activeTab = cn("nav-link", {
            active: currentCategory === el.name,
          });
          return (
            <li
              className={activeTab}
              key={el.name}
              onClick={this.onCategoryClick(el.name)}
            >
              {el.name.toUpperCase()}
            </li>
          );
        })}
      </ul>
    );
  }
}

const NavWithRouter = withRouter(NavTabs);

export default NavWithRouter;
