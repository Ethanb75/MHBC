import React, { Component } from "react";

export default class LineItem extends Component {
  decrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity - 1;
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  incrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity + 1;
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  render() {
    //TODO: fix edge case error where removing and item from shopify
    //      while users have said item in cart causes sitewide render issue
    return (
      <li className="Line-item">
        <button
          className="Line-item__remove"
          onClick={() =>
            this.props.removeLineItemInCart(this.props.line_item.id)
          }
        >
          remove
        </button>
        <div className="Line-item__img">
          {this.props.line_item.variant.image ? (
            <img
              src={this.props.line_item.variant.image.src}
              alt={`${this.props.line_item.title} product shot`}
            />
          ) : null}
        </div>
        <div className="Line-item__content">
          <div className="Line-item__content-row">
            <span className="Line-item__title">
              {this.props.line_item.title}
            </span>
            <div className="Line-item__variant-title">
              {this.props.line_item.variant.title}
            </div>
          </div>
          <div className="Line-item__content-row">
            <div className="Line-item__quantity-container">
              <button
                className="Line-item__quantity-update"
                onClick={() => this.decrementQuantity(this.props.line_item.id)}
              >
                -
              </button>
              <span className="Line-item__quantity">
                {this.props.line_item.quantity}
              </span>
              <button
                className="Line-item__quantity-update"
                onClick={() => this.incrementQuantity(this.props.line_item.id)}
              >
                +
              </button>
            </div>
            <span className="Line-item__price">
              ${" "}
              {(
                this.props.line_item.quantity *
                this.props.line_item.variant.price
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </li>
    );
  }
}
