import React from "react";
import "./style.css";
import cn from "classnames";

class OptionsPicker extends React.Component {
  selectValue = (event) => {
    if (this.props.onSelect) {
      this.props.onSelect(event.currentTarget.dataset.option);
    }
  };

  render() {
    const optionNameStyle = cn("option-name", {
      "cart-popup": this.props.className === "cart-popup",
      "main-cart": this.props.className === "main-cart",
    });
    const optionBlockStyle = cn("option-block", {
      "cart-popup": this.props.className === "cart-popup",
      "main-cart": this.props.className === "main-cart",
    });

    return (
      <div className={optionBlockStyle}>
        <p className={optionNameStyle}>{this.props.title}:</p>
        <ul className="options-list">
          {this.props.options.map((el) => {
            const itemStyle = cn("option-item", {
              "option-item-selected": this.props.value === el.value,
              "cart-popup": this.props.className === "cart-popup",
              "main-cart": this.props.className === "main-cart",
            });

            const divItemStyle = cn("list-item-block", {
              "cart-popup": this.props.className === "cart-popup",
              "main-cart": this.props.className === "main-cart",
            });
            const pItemStyle = cn("list-item-text", {
              "cart-popup": this.props.className === "cart-popup",
              "main-cart": this.props.className === "main-cart",
            });

            return (
              <li
                className={itemStyle}
                key={el.value}
                data-option={el.value}
                onClick={this.selectValue}
              >
                <div className={divItemStyle}>
                  <p className={pItemStyle}>{el.value}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default OptionsPicker;
