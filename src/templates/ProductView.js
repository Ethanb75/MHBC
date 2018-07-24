import React, { Component } from 'react'
import Helmet from 'react-helmet';
// import { Accordion, Form, Menu } from 'semantic-ui-react';
import Link from 'gatsby-link';

// import client from '../shopify';

import VariantSelector from '../components/VariantSelector';

// import 'semantic-ui-css/semantic.min.css';
import './ProductView.css';

const mockProduct = 'https://cdn.shopify.com/s/files/1/0141/0855/7370/files/mockProduct.jpeg?2414997021602847072'
let animTimer;

function animateButton(timestamp) {
  let buyButton = document.querySelector('.productView__select button');
  if (!animTimer) animTimer = timestamp;

  var progress = timestamp - animTimer;

  buyButton.classList.add('animateBtn');

  if (progress < 1500) {
    window.requestAnimationFrame(animateButton);
  } else {
    // remove class
    buyButton.classList.remove('animateBtn');
    animTimer = null;
  }
}

export default class ProductView extends Component {
  state = {
    product: undefined
  }

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
          <Helmet
            title={this.state.product.title}
            meta={[
              { name: 'description', content: `${this.state.product.description}` },
              { name: 'keywords', content: 'Mile High Boys Club, MHBC, MHBC Fashion, fashion' },
            ]}
          />
          <div className="productView__select">
            {variantSelectors}
            <div>
              <label>Quantity</label>
              <input min="1" type="number" className="Product__option" defaultValue={variantQuantity} onChange={ev => this.handleQuantityChange(ev)}></input>
            </div>
            <div>
              <button onClick={ev => {
                let start;
                this.props.addVariantToCart(variant.id, variantQuantity);
                window.requestAnimationFrame(animateButton, start, ev.target);
                setTimeout(() => {
                  this.props.handleCartClose();
                }, 1000)
              }}>Add to Cart</button>
            </div>
          </div>

          <div
            className="productView__image"
            style={this.state.product.images.length ? { backgroundImage: `url(${variantImage.src && mockProduct})` } : { backgroundImage: `url(${mockProduct})` }}
          >
            <div className="productView__return">
              <Link to="/en/Catalog">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </Link>
            </div>
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

