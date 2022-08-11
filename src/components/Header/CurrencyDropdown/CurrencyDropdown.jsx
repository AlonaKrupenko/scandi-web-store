import React from "react";
import "./style.css";
import { GET_CURRENCIES } from "./../../../graphQL/Queries";
import { client } from "../../../App";
import { ReactComponent as ArrowUp } from "../../../assets/dropdown_up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/dropdown_down.svg";
import { connect } from "react-redux";
import { currencySlice } from "../../../redux/currency";

class CurrencyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currenciesData: [],
    };
    this.dropdownMenu = React.createRef();
  }

  fetchCurrencies = (currency) => {
    client
      .query({
        query: GET_CURRENCIES,
        variables: {
          currency,
        },
      })
      .then((res) => {
        this.setState({
          currenciesData: res.data.currencies,
        });
      });
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  showMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      isOpen: true,
    });

    document.addEventListener("click", this.closeMenu);
  };

  closeMenu = (event) => {
    if (!this.dropdownMenu.current.contains(event.target)) {
      this.setState({
        isOpen: false,
      });

      document.removeEventListener("click", this.closeMenu);
    }
  };

  selectCurrency = (currency) => () => {
    this.props.dispatch(currencySlice.actions.changeCurrency(currency));
    console.log(currency, "curr");
  };

  render() {
    console.log(this.props, "proooops");
    return (
      <div className={`currency-dropdown ${this.props.className}`}>
        <span onClick={this.showMenu}>
          {this.props.selectedCurrency.symbol}
        </span>
        {this.state.isOpen ? <ArrowUp /> : <ArrowDown />}

        {this.state.isOpen ? (
          <ul className="currency-list" ref={this.dropdownMenu}>
            {this.state.currenciesData.map((el) => {
              return (
                <li
                  key={el.symbol}
                  className="currency-item"
                  onClick={this.selectCurrency(el)}
                >
                  {el.symbol} {el.label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.currency.selectedCurrency,
  };
};

const ConnectedCurrencyDropdown = connect(
  mapStateToProps,
  null
)(CurrencyDropdown);

export default ConnectedCurrencyDropdown;
