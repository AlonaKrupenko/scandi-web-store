import React from "react";
import cn from "classnames";
import "./style.css";

class ColorsOptionsPicker extends React.Component {
  selectColorValue = (event) => {
    if (this.props.onSelect) {
      this.props.onSelect(event.currentTarget.dataset.color);
    }
  };

  render() {
    const optionNameStyle = cn("option-name", "color", {
      "cart-popup": this.props.className === "cart-popup",
    });
    const optionBlockStyle = cn("option-block", {
      "cart-popup": this.props.className === "cart-popup",
    });
    return (
      <div className={optionBlockStyle}>
        <p className={optionNameStyle}>{this.props.title}:</p>
        <ul className="options-list color">
          {this.props.options.map((el) => {
            const itemStyle = cn("option-item", "color", {
              "option-item-selected": this.props.value === el.value,
            });

            const cororDivStyle = cn("list-item-block color", {
              "cart-popup": this.props.className === "cart-popup",
            });

            const divSyle = { backgroundColor: String(el.value) };

            return (
              <li
                className={itemStyle}
                key={el.value}
                data-color={el.value}
                onClick={this.selectColorValue}
              >
                <div className={cororDivStyle} style={divSyle}></div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ColorsOptionsPicker;
