import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Accordion, Icon, Label } from 'semantic-ui-react';
import Helmet from 'react-helmet'


import Products from '../components/Products';
import Footer from '../components/Footer/Footer';
import Carousel from '../components/Carousel/Carousel';

import 'semantic-ui-css/semantic.min.css';
import '../assets/catalog.css';


// example:
// activeFilters = ['home collection', '']

export default class Catalog extends Component {
  state = {
    filteredProducts: undefined,
    activeFilters: [],
    filterIndex: 0,
    activeFilterIndex: -1
  }

  handleFilterClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeFilterIndex } = this.state
    const newIndex = activeFilterIndex === index ? -1 : index

    this.setState({ activeFilterIndex: newIndex })
  }

  filterProductsByType(productType) {
    // add the loading css
    return this.props.client.product.fetchQuery({ sortKey: 'PRODUCT_TYPE', query: productType }).then((products) => {
      //remove the loading css
      this.setState({
        filteredProducts: products
      })
    });
  }

  componentDidMount() {
    //TODO: re- fetch products after every load

    // add different page style
    document.querySelector('.footer__links').classList.add('catalog');
    document.querySelector('.sideBar').classList.add('catalog');
    document.querySelector('.sideBar__btn').classList.add('catalog');
    document.querySelectorAll('li.topBar__link a').forEach(el => el.classList.add('catalog'));

    this.props.handleCartClose();
  }

  render() {
    // console.log(this.props.checkout.subtotalPrice);
    // console.log(this.props.products);

    //find all the product types and filter to remove duplicates
    let productTypes = this.props.products
      .map(product => {
        return product.productType;
      })
      .filter((val, index, self) => self.indexOf(val) === index)
      .map(type => {
        return (
          <li key={type}>{type}</li>
        )
      });
    let collections = this.props.collections.map(collection => {
      return (
        <li key={collection.title}>
          {collection.title}
        </li>
      )
    });



    const { activeFilterIndex } = this.state;
    return (
      <div>
        <Helmet
          title="Mile High Boys Club | Catalog"
          meta={[
            { name: 'description', content: 'Mile High Boys Club official website and merch store. Browse our catalog' },
            { name: 'keywords', content: 'Mile High Boys Club, MHBC, MHBC Fashion, fashion' },
          ]}
        />
        <header id="catalogHeader">
          <div>
            <Carousel />
            <div className="catalogHeader__text">
              <h1>Catalog</h1>
              <p>
                All products in our exclusive collection
              </p>
            </div>
          </div>
        </header>
        <div className="catalogCategory">
          <h2>
            <span>
              <Link to="/">Home</Link> &rarr; Catalog
            </span>
            <div>
              {this.props.products.length} results
              <span></span>
            </div>
          </h2>
        </div>
        {/* {!this.state.isCartOpen && <button onClick={() => this.setState({ isCartOpen: true })}>Open Cart</button>} */}
        <main id="catalogMain">
          <div className="catalogFilter">
            <div className="filter">
              <label>Filter By</label>
              <Accordion fluid>
                <Accordion.Title active={activeFilterIndex === 0} index={0} onClick={this.handleFilterClick}>
                  <Icon name='dropdown' />
                  Collection
                </Accordion.Title>
                <Accordion.Content active={activeFilterIndex === 0}>
                  <ul>
                    {collections}
                  </ul>
                </Accordion.Content>

                <Accordion.Title active={activeFilterIndex === 1} index={1} onClick={this.handleFilterClick}>
                  <Icon name='dropdown' />
                  Product Type
                </Accordion.Title>
                <Accordion.Content active={activeFilterIndex === 1}>
                  <ul>
                    {productTypes}
                  </ul>
                </Accordion.Content>
              </Accordion>
            </div>
          </div>

          {/* if filtered is full, render that, if not render all products */}
          <Products
            products={this.state.filteredProducts ? this.state.filteredProducts : this.props.products}
            client={this.props.client}
            addVariantToCart={this.addVariantToCart}
          />
        </main>

        <Footer />
      </div>
    )
  }
}