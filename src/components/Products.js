import React, { Component } from 'react';

import Product from './Product/Product.js';

import loadingIcon from '../assets/loading.svg'


export default class Products extends Component {
  render() {
    if (this.props.products) {
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
    } else {
      // if no products prop, and noProductsFound is set to true, return no products
      if (this.props.noProductsFound) {
        return (
          <div className="Product-wrapper">
            <div className="Product-loading">
              <h3>No Products Found</h3>
            </div>
          </div>
        )
      } else {
        // else it's still possibly loading
        return (
          <div className="Product-wrapper">
            <div className="Product-loading"><img src={loadingIcon} /></div>
          </div>
        );
      }
    }








  }
}