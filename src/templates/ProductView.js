import React, { Component } from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

import VariantSelector from "../components/VariantSelector";
import logoWht from "../assets/logo-wht.png";
import logoBlk from "../assets/logo-blk.png";

import "./ProductView.css";

const mockProduct =
  "https://cdn.shopify.com/s/files/1/0141/0855/7370/files/mockProduct.jpeg?2414997021602847072";

const SIZE_OPTIONS_NAME = "Size";
let animTimer;

function animateButton(timestamp) {
  let buyButton = document.querySelector(".productView__select button");
  if (!animTimer) animTimer = timestamp;

  let progress = timestamp - animTimer;

  buyButton.classList.add("animateBtn");

  if (progress < 1500) {
    window.requestAnimationFrame(animateButton);
  } else {
    // remove class
    buyButton.classList.remove("animateBtn");
    animTimer = null;
  }
}

const SizeOptions = ({ options, currentOption, handleSizeOptionChange }) => {
  return (
    <div className="sizeOptionWrapper">
      <p>Size</p>
      {options.map((option) => {
        const { value } = option;
        const isSelectedSize = currentOption === value;
        return (
          <button
            className={
              isSelectedSize ? "sizeOption isSelectedSize" : "sizeOption"
            }
            type="button"
            onClick={() => handleSizeOptionChange(value)}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default class ProductView extends Component {
  state = {
    currentProductImage: 0,
    product: undefined,
    productImageLoaded: {},
    sizeOptions: [],
    selectedSize: "",
  };

  componentDidMount() {
    let defaultOptionValues = {};
    let defaultState = this.state;

    // so that the default state isn't overwritten when adding default product options...
    // add default state
    this.state = {
      ...defaultState,
      selectedOptions: defaultOptionValues,
    };

    // bind handlers to this
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);

    if (this.state.product) {
      this.state.product.options.forEach((selector) => {
        defaultOptionValues[selector.name] = selector.values[0].value;
      });
    } else {
      this.props.client.product
        .fetch(this.props.pathContext.id.replace("Shopify__Product__", ""))
        .then((product) => {
          const sizeOptionsObject = product.options.find(
            (option) => option.name === SIZE_OPTIONS_NAME
          );
          if (sizeOptionsObject) {
            const { values: sizeOptions } = sizeOptionsObject;
            this.setState({
              product,
              sizeOptions,
              selectedSize: sizeOptions[0].value,
            });
          } else {
            this.setState({
              product,
            });
          }
        });
    }

    // page specific style
    document.querySelector(".topBar__logo img").src = logoBlk;
    document.querySelector(".sideBar__btn").classList.add("catalog");
    document.querySelector(".sideBar").classList.add("catalog");
    document
      .querySelectorAll("li.topBar__link a")
      .forEach((el) => el.classList.add("catalog"));

    //image loaded handlers
  }

  componentWillUnmount() {
    document.querySelector(".topBar__logo img").src = logoWht;
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function(image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target;
    const { sizeOptions, selectedSize } = this.state;
    const hasSizeOptions = sizeOptions.length > 0;
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    if (hasSizeOptions) {
      selectedOptions.Size = selectedSize;
    }

    const selectedVariant = this.props.client.product.helpers.variantForOptions(
      this.state.product,
      selectedOptions
    );

    // after option change, switch to image index
    let optionIndex = this.state.product.images.findIndex(
      (el) => el.id === selectedVariant.attrs.image.id
    );

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image,
      currentProductImage: optionIndex,
    });
  }

  handleSizeOptionChange(selectedSize) {
    const selectedOptions = {
      Size: selectedSize,
    };

    const selectedVariant = this.props.client.product.helpers.variantForOptions(
      this.state.product,
      selectedOptions
    );

    this.setState({
      selectedSize,
      selectedVariant,
    });
  }

  previousImage() {
    const { currentProductImage } = this.state;

    this.setState({
      currentProductImage:
        currentProductImage === 0
          ? this.state.product.images.length - 1
          : currentProductImage - 1,
    });
  }

  nextImage() {
    const { currentProductImage } = this.state;

    this.setState({
      currentProductImage:
        currentProductImage === this.state.product.images.length - 1
          ? 0
          : currentProductImage + 1,
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value,
    });
  }
  render() {
    const { currentProductImage, sizeOptions, selectedSize } = this.state;
    const hasSizeOptions = sizeOptions.length > 0;
    if (this.state.product) {
      let show360Button = this.state.product.tags.map((tag) => {
        // if one of the tags are '360 view' then return a tag
        if (tag.value === "360 view") {
          return (
            <div className="rotateLink">
              <Link to={`${this.props.location.pathname}/360-view`}>
                360 view &rarr;
              </Link>
            </div>
          );
        } else {
          return null;
        }
      });

      let variantImage = this.state.product.images[currentProductImage];
      let variant =
        this.state.selectedVariant || this.state.product.variants[0];
      let variantQuantity = this.state.selectedVariantQuantity || 1;
      let variantSelectors = this.state.product.options.map((option) => {
        return (
          <VariantSelector
            handleOptionChange={(ev) => this.handleOptionChange(ev)}
            key={option.id.toString()}
            option={option}
            variant={variant}
            title={this.state.product.title}
            type={this.state.product.productType}
          />
        );
      });

      // console.log("variant", variant);
      // console.log("product", this.state.product);
      // console.log("product options", sizeOptions);
      // console.log("selectedSize", selectedSize);
      // console.log("selected variant", this.state.selectedVariant);

      let productImageSelectButtons = this.state.product.images.map(
        (image, index) => {
          return (
            <button
              key={image.id}
              onClick={() => this.setState({ currentProductImage: index })}
              style={
                currentProductImage === index
                  ? { backgroundColor: "#84754E", transform: "scale(1.2)" }
                  : {}
              }
            />
          );
        }
      );

      // render return
      return (
        <div className="productView">
          <Helmet
            title={this.state.product.title}
            meta={[
              {
                name: "description",
                content: `${this.state.product.description}`,
              },
              {
                name: "keywords",
                content: "Mile High Boys Club, MHBC, MHBC Fashion, fashion",
              },
            ]}
          />
          <div className="productView__select">
            <div className="productView__mobileDesc">
              <h2>{this.state.product.title}</h2>
              <p>{this.state.product.description}</p>
              {hasSizeOptions ? (
                <SizeOptions
                  options={sizeOptions}
                  handleSizeOptionChange={(val) =>
                    this.handleSizeOptionChange(val)
                  }
                  currentOption={selectedSize}
                />
              ) : null}
              {variantSelectors}
              <span>${variant.price}</span>
            </div>
            <div>
              <button
                onClick={(ev) => {
                  let start;
                  console.log("add to cart", variant.id, variantQuantity);
                  this.props.addVariantToCart(
                    variant.id,
                    variantQuantity,
                    selectedSize
                  );
                  window.requestAnimationFrame(animateButton, start, ev.target);
                  setTimeout(() => {
                    this.props.handleCartClose();
                  }, 1000);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Productview image background image, if there isn't an image use the mock */}
          <div
            className="productView__image"
            style={
              this.state.product.images.length
                ? { backgroundImage: `url(${mockProduct && variantImage.src})` }
                : { backgroundImage: `url(${mockProduct})` }
            }
          >
            <div className="productView__return">
              <Link to="/en/Catalog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </Link>
            </div>

            {/* buttons to manually select photo, number of button based on arr */}
            <div className="productView__imageSelect">
              {productImageSelectButtons}
              {show360Button}
            </div>
          </div>

          {/* if there's more than one image, show the change image controllers */}
          {this.state.product.images.length > 1 ? (
            <div className="productImageControls">
              <button onClick={this.previousImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevrons-left"
                >
                  <polyline points="11 17 6 12 11 7" />
                  <polyline points="18 17 13 12 18 7" />
                </svg>
              </button>
              <button onClick={this.nextImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevrons-right"
                >
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </button>
            </div>
          ) : null}

          {/* load images but keep them hidden to cache the requests */}
          <span>
            {this.state.product.images.map((image) => {
              return <span style={{ backgroundImage: `url(${image.src})` }} />;
            })}
          </span>
        </div>
      );
    } else {
      return <div>Loading . . .</div>;
    }
  }
}
