import React from "react";
import cn from "classnames";
import "./style.css";

class ColorsOptionsPicker extends React.Component {
  selectColorValue = (event) => {
    this.props.onSelect(event.currentTarget.dataset.color);
  };

  render() {
    return (
      <>
        <p className="option-name color">{this.props.title}:</p>
        <ul className="options-list color">
          {this.props.options.map((el) => {
            const itemStyle = cn("option-item", "color", {
              "option-item-selected": this.props.value === el.value,
            });

            const divSyle = { backgroundColor: String(el.value) };

            return (
              <li
                className={itemStyle}
                key={el.value}
                data-color={el.value}
                onClick={this.selectColorValue}
              >
                <div className="list-item-block color" style={divSyle}></div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default ColorsOptionsPicker;
