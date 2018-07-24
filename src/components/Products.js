import React, { Component } from 'react';

import Product from './Product/Product.js';

import loadingIcon from '../assets/loading.svg'


export default class Products extends Component {
  render() {
    let products = this.props.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.props.addVariantToCart}
          client={this.props.client}
          key={product.id.toString()}
          product={product}
        />
      );
    });

    return (
      <div className="Product-wrapper">
        {this.props.products.length === 0 ?
          <div className="Product-loading"><img src={loadingIcon} /></div> : products}
      </div>
    );
  }
}