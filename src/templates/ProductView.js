import React, { Component } from 'react'
import Helmet from 'react-helmet';
// import { Accordion, Form, Menu } from 'semantic-ui-react';
import Link from 'gatsby-link';

// import client from '../shopify';

import VariantSelector from '../components/VariantSelector';

// import 'semantic-ui-css/semantic.min.css';
import './ProductView.css';

const mockProduct = 'https://cdn.shopify.com/s/files/1/0141/0855/7370/files/mockProduct.jpeg?2414997021602847072'
let animTimer, imageAnimTimer;

function animateButton(timestamp) {
  let buyButton = document.querySelector('.productView__select button');
  if (!animTimer) animTimer = timestamp;

  let progress = timestamp - animTimer;

  buyButton.classList.add('animateBtn');

  if (progress < 1500) {
    window.requestAnimationFrame(animateButton);
  } else {
    // remove class
    buyButton.classList.remove('animateBtn');
    animTimer = null;
  }
}

// if you remove below, remove the imageAnimTimer variable
// function changeImage(timestamp) {
//   const el = document.querySelector('.productView__image');
//   if (!imageAnimTimer) imageAnimTimer = timestamp;

//   let progress = timestamp - imageAnimTimer;

//   el.classList.add('imageLoaded');

//   if (progress < 2000) {
//     window.requestAnimationFrame(changeImage);
//   } else {
//     el.classList.remove('imageLoaded');
//     imageAnimTimer = null;
//   }
// }

export default class ProductView extends Component {
  state = {
    currentProductImage: 0,
    product: undefined
  }

  componentDidMount() {
    let defaultOptionValues = {};
    let defaultState = this.state;

    // so that the default state isn't overwritten when adding default product options...
    // add default state
    this.state = {
      ...defaultState,
      selectedOptions: defaultOptionValues
    };

    // bind handlers to this
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);

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

  previousImage() {
    const { currentProductImage } = this.state;

    this.setState({
      currentProductImage: currentProductImage === 0 ? this.state.product.images.length - 1 : currentProductImage - 1
    });
  }

  nextImage() {
    const { currentProductImage } = this.state;

    this.setState({
      currentProductImage: currentProductImage === 3 ? 0 : currentProductImage + 1
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }
  render() {
    const { currentProductImage } = this.state;
    if (this.state.product) {
      let variantImage = this.state.selectedVariantImage || this.state.product.images[currentProductImage];
      let variant = this.state.selectedVariant || this.state.product.variants[0];
      let variantQuantity = this.state.selectedVariantQuantity || 1;
      let variantSelectors = this.state.product.options.map((option) => {
        return (
          <VariantSelector
            handleOptionChange={ev => this.handleOptionChange(ev)}
            key={option.id.toString()}
            option={option}
          />
        );
      });

      let productImageSelectButtons = this.state.product.images.map((image, index) => {
        return (
          <button
            key={image.id}
            onClick={() => this.setState({ currentProductImage: index })}
            style={currentProductImage === index ? { backgroundColor: '#84754E', transform: 'scale(1.2)' } : {}}
          ></button>
        )
      })


      // render return
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
            <div className="productView__mobileDesc">
              <h2>{this.state.product.title}</h2>
              <p>{this.state.product.description}</p>
              <span>${variant.price}</span>
            </div>
            <div>
              {/* <span>
                <label>Quantity</label>
                <input min="1" type="number" className="Product__option" defaultValue={variantQuantity} onChange={ev => this.handleQuantityChange(ev)}></input>
              </span> */}
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

          {/* Productview image background image, if there isn't an image use the mock */}
          <div
            className="productView__image"
            style={this.state.product.images.length ? { backgroundImage: `url(${mockProduct && variantImage.src})` } : { backgroundImage: `url(${mockProduct})` }}
          >
            <div className="productView__return">
              <Link to="/en/Catalog">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </Link>
            </div>

            {/* buttons to manually select photo, number of button based on arr */}
            <div className="productView__imageSelect">
              {productImageSelectButtons}
            </div>
          </div>

          {/* if there's more than one image, show the change image controllers */}
          {
            this.state.product.images.length > 1 ?
              <div className="productImageControls">
                <button onClick={this.previousImage}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                </button>
                <button onClick={this.nextImage}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                </button>
              </div> : null
          }


        </div>
      )
    } else {
      return <div>Loading . . .</div>
    }
  }
}

