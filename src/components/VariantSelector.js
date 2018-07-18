import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

// import 'semantic-ui-css/semantic.min.css';


const options = [
  { key: 'AL', value: 'AL', text: 'Alabama' },
  { key: 'GAs', value: 'GA', text: 'Georgia' },
  { key: 'TX', value: 'TX', text: 'Texas' }
]



export default class VariantSelector extends Component {
  render() {
    return (
      <div>
        <label>{this.props.option.name}</label>
        <select
          className="Product__option"
          name={this.props.option.name}
          key={this.props.option.name}
          onChange={this.props.handleOptionChange}
        >
          {this.props.option.values.map((value) => {
            return (
              <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
            )
          })}
        </select>
        {/* <Dropdown placeholder='State' search selection options={options} /> */}
      </div>
    );
  }
}
