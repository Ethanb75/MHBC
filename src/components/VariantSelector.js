import React, { Component } from 'react';

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
    console.log(this.props)
    // if no variations for a product, the default returns 'Title'
    if (this.props.option.name === 'Title') {
      return null;
    } else {
      // return (
      //   <select
      //       className="Product__option"
      //       name={this.props.option.name}
      //       key={this.props.option.name}
      //       onChange={this.props.handleOptionChange}
      //     >
      //       {this.props.option.values.map((value) => {
      //         // return (
      //         //   <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
      //         // )
      //         return (
      //           <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
      //         )
      //       })}
      //   </select>
      // );

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
                    <span className={`colorSelect__color colorSelect__color--${value}`}></span>
                  </label>
                </div>
              )
            })}
        </div>
      );
    }
  }
}
