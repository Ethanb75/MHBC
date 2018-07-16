import React, { Component } from 'react';

import LineItem from '../LineItem';

import './Cart.css';

export default class Cart extends Component {
  openCheckout = () => {
    let checkLink = this.props.checkout.webUrl
    window.open(checkLink);
  }

  render() {
    let cartItems = this.props.checkout.lineItems.map(item => {
      return <LineItem
        updateQuantityInCart={this.props.updateQuantityInCart}
        removeLineItemInCart={this.props.removeLineItemInCart}
        key={item.id.toString()}
        line_item={item}
      />
    });

    return (
      <div className={this.props.isCartOpen ? "cart open" : "cart"}>
        <div className="cart__close">
          <button onClick={this.props.handleCartClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h3>My Cart</h3>
        </div>
        <div className="cart__items">
          <ul>
            {cartItems.length === 0 ? <li className="cart__empty">empty</li> : cartItems}
          </ul>
        </div>
        <div className="cart__checkout">
          <button onClick={this.openCheckout}>checkout</button>
        </div>
      </div>
    )
  }
}