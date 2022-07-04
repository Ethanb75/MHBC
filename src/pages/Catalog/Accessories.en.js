import React, { Component } from "react";
import Link from "gatsby-link";
import { Accordion, Icon, Label } from "semantic-ui-react";
import Helmet from "react-helmet";

import Products from "../../components/Products";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";

import "semantic-ui-css/semantic.min.css";
import "../../assets/catalog.css";

// example:
// activeFilters = ['home collection', '']

export default class Apparel extends Component {
  state = {
    filteredProducts: undefined,
    noSearchResults: false,
  };

  handleFilterClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeFilterIndex } = this.state;
    const newIndex = activeFilterIndex === index ? -1 : index;

    this.setState({ activeFilterIndex: newIndex });
  };

  filterProductsByType(productType) {
    let filtered = [];
    // add the loading css
    this.props.client.product.fetchAll().then((products) => {
      // fetch all products and filter by productType
      products.forEach((product) => {
        if (product.productType === productType) {
          filtered.push(product);
        }
      });

      // if the length is greater than 0, add the products, else set noSearchResults to true
      if (filtered.length > 0) {
        this.setState({ filteredProducts: filtered });
      } else {
        this.setState({
          noSearchResults: true,
        });
      }
    });
  }

  componentDidMount() {
    this.filterProductsByType("Accessories");

    // add different page style
    document.querySelector(".footer__links").classList.add("catalog");
    document.querySelector(".sideBar").classList.add("catalog");
    document.querySelector(".sideBar__btn").classList.add("catalog");
    document
      .querySelectorAll("li.topBar__link a")
      .forEach((el) => el.classList.add("catalog"));

    this.props.handleCartClose();
  }

  render() {
    //find all the product types and filter to remove duplicates
    let productTypes = this.props.products
      .map((product) => {
        return product.productType;
      })
      .filter((val, index, self) => self.indexOf(val) === index)
      .map((type) => {
        return (
          <li key={type}>
            <Link to={`/en/Catalog/${type}`}>{type}</Link>
          </li>
        );
      });

    // let collections = this.props.collections.map(collection => {
    //   return (
    //     <li key={collection.title}>
    //       {collection.title}
    //     </li>
    //   )
    // });

    const { activeFilterIndex } = this.state;
    return (
      <div>
        <Helmet
          title="Mile High Boys Club | Catalog | Hats"
          meta={[
            {
              name: "description",
              content:
                "Mile High Boys Club official website and merch store. Hats Catalog Page.",
            },
            {
              name: "keywords",
              content: "Mile High Boys Club, MHBC, MHBC Fashion, fashion",
            },
          ]}
        />
        <header id="catalogHeader">
          <div>
            <Carousel />
          </div>
          <div className="catalogHeader__textHeader">
            <h1>Accessories</h1>
          </div>
        </header>
        <div className="catalogCategory">
          <h2>
            <span>
              <Link to="/">Home</Link> &rarr;{" "}
              <Link to="/en/Catalog">Catalog</Link> &rarr; Accessories
            </span>
            <div>
              {this.state.filteredProducts
                ? this.state.filteredProducts.length
                : 0}{" "}
              results
              <span />
            </div>
          </h2>
        </div>
        {/* {!this.state.isCartOpen && <button onClick={() => this.setState({ isCartOpen: true })}>Open Cart</button>} */}
        <main id="catalogMain">
          <div className="catalogFilter">
            <div className="filter">
              <Accordion>
                <Accordion.Title
                  active={activeFilterIndex === 1}
                  index={1}
                  onClick={this.handleFilterClick}
                >
                  <label>Filter By</label>
                  <Icon name="dropdown" />
                  {/* <span>Product Type</span> */}
                </Accordion.Title>
                <Accordion.Content active={activeFilterIndex === 1}>
                  <ul>{productTypes}</ul>
                </Accordion.Content>
              </Accordion>
            </div>
          </div>

          {/* if filtered is full, render that, if not render all products */}
          <Products
            products={this.state.filteredProducts}
            client={this.props.client}
            addVariantToCart={this.addVariantToCart}
            noProductsFound={this.state.noSearchResults}
          />
        </main>

        <Footer />
      </div>
    );
  }
}
