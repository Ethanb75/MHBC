import React, { Component } from "react";
import productMetaData from "../data/productInformation/available-colors.json";

export default class VariantSelector extends Component {
  state = {
    selectedOption: "",
  };
  changeSelectedVariant(val) {
    this.setState({ selectedOption: val });
  }
  render() {
    console.log("variant sel props", this.props);
    // if no variations for a product, the default returns 'Title'
    if (this.props.option.name === "Color") {
      const colorData =
        productMetaData.products[`${this.props.title}`].variants;

      // new
      return (
        <div className="Product__option">
          {this.props.option.values.map((value) => {
            return (
              <div key={`${value}`}>
                <label style={{ color: "white" }} for={`${value}`}>
                  <input
                    type="radio"
                    className="colorSelect"
                    id={`${value}`}
                    name={this.props.option.name}
                    value={`${value}`}
                    onChange={this.props.handleOptionChange}
                    checked={this.props.variant.title.includes(value.value)}
                  />
                  <span
                    className={`colorSelect__color colorSelect__color--${value}`}
                  >
                    <span
                      style={{
                        backgroundColor: colorData[`${value}`].hex,
                      }}
                    />
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
