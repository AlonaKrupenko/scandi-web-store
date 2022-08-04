import React from "react";
import { ReactComponent as IncreaseQnt } from "../../assets/increase_quantity.svg";
import { ReactComponent as DecreaseQnt } from "../../assets/decrease_quantity.svg";
import "./style.css";
import cn from "classnames";

class QuantitySelector extends React.Component {
  onChange = (type) => () => {
    const currentValue = this.props.value;
    if (type === "increase") {
      this.props.onChange(currentValue + 1);
    } else {
      this.props.onChange(currentValue - 1);
    }
  };

  render() {
    const iconClasses = cn("icon", {
      "icon-small": this.props.size === "small",
    });
    const labelClasses = cn("label", {
      "label-small": this.props.size === "small",
    });

    const containerClasses = cn("control-qnt", {
      "small-cart-qnt-selector":
        this.props.className === "small-cart-qnt-selector",
    });

    return (
      <div className={containerClasses}>
        <IncreaseQnt
          className={iconClasses}
          onClick={this.onChange("increase")}
        />
        <p className={labelClasses}>{this.props.value}</p>
        <DecreaseQnt
          className={iconClasses}
          onClick={this.onChange("decrease")}
        />
      </div>
    );
  }
}

export default QuantitySelector;
