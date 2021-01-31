import React, { Component } from 'react';
import productMetaData from "../data/productInformation/available-colors.json"
// import 'semantic-ui-css/semantic.min.css';


const options = [
  { key: 'AL', value: 'AL', text: 'Alabama' },
  { key: 'GAs', value: 'GA', text: 'Georgia' },
  { key: 'TX', value: 'TX', text: 'Texas' }
]



export default class VariantSelector extends Component {
  state = {
    selectedOption: ""
  }
  changeSelectedVariant(val) {
    this.setState({ selectedOption: val })
  } 
  render() {
    console.log('variant sel props', this.props)
    // if no variations for a product, the default returns 'Title'
    if(this.props.option.name === 'Color') {
      const colorData = productMetaData.products[`${this.props.type}`][`${this.props.title}`].variants;

      console.log(colorData)

      // new
      return (
        <div
            className="Product__option"
          >
            {this.props.option.values.map((value) => {
              // return (
              //   <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
              // )
              return (
                <div key={`${value}`}>
                  
                  <label style={{color: "white"}} for={`${value}`}>
                    {/* {`${value}`} */}
                    <input 
                      type="radio" 
                      className="colorSelect"
                      id={`${value}`} 
                      name={this.props.option.name} 
                      value={`${value}`}
                      onChange={this.props.handleOptionChange}
                      checked={this.props.variant.title === value.value}
                    />
                    <span className={`colorSelect__color colorSelect__color--${value}`}>
                      <span style={{
                        backgroundColor: colorData[`${value}`].hex
                        // backgroundColor: "blue"
                      }}></span>
                    </span>
                  </label>
                </div>
              )
            })}
        </div>
      );
    } else {
      return null
    }
  }
}
