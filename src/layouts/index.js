import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../components/Nav/Header";
import Helmet from "react-helmet";
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n";
import { IntlProvider } from "react-intl";
import "intl";
import "./index.css";

import client from "../shopify/index.js";

class TemplateWrapper extends Component {
  // state = {
  //   isCartOpen: false,
  //   checkout: { lineItems: [] },
  //   products: [],
  //   shop: {}
  // }
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkoutInit: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
      collections: [],
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
  }

  componentDidMount() {
    //need to first check if checkoutId is already set
    let checkoutId = window.sessionStorage.getItem("checkoutId");

    if (!checkoutId) {
      client.checkout
        .create()
        .then((checkout) => {
          this.setState({
            checkout,
          });
          window.sessionStorage.setItem("checkoutId", checkout.id);
        })
        .catch((err) => console.log(err));
    } else {
      client.checkout
        .fetch(checkoutId)
        .then((checkout) => {
          this.setState({
            checkout,
          });
        })
        .catch((err) => console.log(err));
    }

    client.collection.fetchAll().then((collections) => {
      this.setState({
        collections,
      });
    });

    client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart(variantId, quantity, sizeOption) {
    // possibly not needed
    this.setState({
      isCartOpen: true,
    });

    const size = sizeOption
      ? {
          customAttributes: [{ key: "Size", value: sizeOption }],
        }
      : {};

    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
        ...size,
      },
    ];
    const checkoutId = this.state.checkout.id;

    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((res) => {
      console.log("res", res);
      this.setState({
        checkout: res,
      });
    });

    return;
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ];

    return client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id;

    return client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  toggleCart() {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    const url = this.props.location.pathname;
    const {
      langs,
      defaultLangKey,
    } = this.props.data.site.siteMetadata.languages;
    const {
      addVariantToCart,
      updateQuantityInCart,
      handleCartClose,
      removeLineItemInCart,
      filterProductsByType,
    } = this;

    const { products, isCartOpen, checkout, shop, collections } = this.state;

    const langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const homeLink = `/${langKey}/`;
    const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

    return (
      <IntlProvider locale={langKey} messages={this.props.i18nMessages}>
        <div>
          <Helmet
            meta={[
              {
                name: "google-site-verification",
                content: "D9JFvU86XL9uleowtlA-p5qU2rPMyZ4KscvTQQV1Kpw",
              },
            ]}
          />
          <Header
            langs={langsMenu}
            checkout={this.state.checkout}
            isCartOpen={this.state.isCartOpen}
            handleCartClose={this.handleCartClose}
            updateQuantityInCart={this.updateQuantityInCart}
            removeLineItemInCart={this.removeLineItemInCart}
            toggleCart={this.toggleCart}
          />
          <div className="mainWrap">
            {this.props.children({
              ...this.props,
              addVariantToCart,
              updateQuantityInCart,
              removeLineItemInCart,
              handleCartClose,
              filterProductsByType,
              isCartOpen,
              client,
              checkout,
              collections,
              products,
            })}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const pageQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
