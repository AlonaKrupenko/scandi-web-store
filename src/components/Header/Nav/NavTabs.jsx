import React from "react";
import "./style.css";
import cn from "classnames";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORY_NAMES } from "../../../graphQL/Queries";
import { withRouter } from "react-router";

class NavTabs extends React.Component {
  onCategoryClick = (category) => () => {
    this.props.history.push("/" + category);
  };

  render() {
    const categories = this.props.data?.categories;
    const currentCategory = this.props.location?.pathname.split("/")[1];

    return (
      <ul className="nav-list">
        {categories?.map((el) => {
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

const NavWithApollo = graphql(GET_CATEGORY_NAMES)(NavTabs);

const NavWithApolloWithRouter = withRouter(NavWithApollo);

export default NavWithApolloWithRouter;
