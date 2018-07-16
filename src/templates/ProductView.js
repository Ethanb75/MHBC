import React, { Component } from 'react'
import Helmet from 'react-helmet'

import Link from 'gatsby-link';

// import client from '../shopify';

import VariantSelector from '../components/VariantSelector';

import './ProductView.css';

export default class ProductView extends Component {
  state = {
    product: undefined
  }

  // constructor(props) {
  //   super(props);

  //   this.openCheckout = this.openCheckout.bind(this);
  // }

  componentDidMount() {
    let defaultOptionValues = {};

    this.state = { selectedOptions: defaultOptionValues };

    if (this.state.product) {
      this.state.product.options.forEach((selector) => {
        defaultOptionValues[selector.name] = selector.values[0].value;
      });
    } else {
      this.props.client.product.fetch(this.props.pathContext.id.replace('Shopify__Product__', '')).then((product) => {
        this.setState({
          product
        })
      });
    }

    document.querySelector('.sideBar__btn').classList.add('catalog');
    document.querySelector('.sideBar').classList.add('catalog');
    document.querySelectorAll('li.topBar__link a').forEach(el => el.classList.add('catalog'))
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  addVariantToCart = (variantId, quantity) => {
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = window.localStorage.getItem('checkoutId')


    // used to be this.props.client.... ??
    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      // this.setState({
      //   checkout: res,
      // });
    });
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.state.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }
  render() {
    // console.log(this.props.working);

    if (this.state.product) {
      let variantImage = this.state.selectedVariantImage || this.state.product.images[0]
      let variant = this.state.selectedVariant || this.state.product.variants[0]
      let variantQuantity = this.state.selectedVariantQuantity || 1
      let variantSelectors = this.state.product.options.map((option) => {
        return (
          <VariantSelector
            handleOptionChange={ev => this.handleOptionChange(ev)}
            key={option.id.toString()}
            option={option}
          />
        );
      });
      return (
        <div className="productView">
          <div className="productView__select">
            {variantSelectors}
            <div>
              <label>Quantity</label>
              <input min="1" type="number" className="Product__option" defaultValue={variantQuantity} onChange={ev => this.handleQuantityChange(ev)}></input>
            </div>
            <div>
              <button onClick={() => this.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
            </div>
          </div>

          <div className="productView__image">
            <div className="productView__return">
              <Link to="/en/Catalog">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </Link>
            </div>

            {/* need to get a mock photo that says 'photo soon' instead of 'null' */}
            {this.state.product.images.length ? <img src={variantImage.src && 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'} alt={`${this.state.product.title} product shot`} /> : null}
            <div className="productView__details">
              <h2>{this.state.product.title}</h2>
              <p>{this.state.product.description}</p>
              <span>${variant.price}</span>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading . . .</div>
    }
    // this.props.pathContext.id

  }
}

