import React from "react";
import "./style.css";
import cn from "classnames";

class OptionsPicker extends React.Component {
  selectValue = (event) => {
    this.props.onSelect(event.currentTarget.dataset.option);
  };

  render() {
    return (
      <div className="option-block">
        <p className="option-name">{this.props.title}:</p>
        <ul className="options-list">
          {this.props.options.map((el) => {
            const itemStyle = cn("option-item", {
              "option-item-selected": this.props.value === el.value,
            });

            return (
              <li
                className={itemStyle}
                key={el.value}
                data-option={el.value}
                onClick={this.selectValue}
              >
                <div className="list-item-block">
                  <p className="list-item-text">{el.value}</p>
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
