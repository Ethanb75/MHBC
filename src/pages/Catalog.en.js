import React, { Component } from 'react';
import Link from 'gatsby-link';
// import { Accordion, Form, Menu } from 'semantic-ui-react';
import Helmet from 'react-helmet'


import Products from '../components/Products';
import Footer from '../components/Footer/Footer';

// import 'semantic-ui-css/semantic.min.css';
import '../assets/catalog.css';

import heading from '../assets/catalogHeader.jpeg';

// const ColorForm = (
//   <Form>
//     <Form.Group grouped>
//       <Form.Checkbox label='Red' name='color' value='red' />
//       <Form.Checkbox label='Orange' name='color' value='orange' />
//       <Form.Checkbox label='Green' name='color' value='green' />
//       <Form.Checkbox label='Blue' name='color' value='blue' />
//     </Form.Group>
//   </Form>
// )

// const SizeForm = (
//   <Form>
//     <Form.Group grouped>
//       <Form.Radio label='Small' name='size' type='radio' value='small' />
//       <Form.Radio label='Medium' name='size' type='radio' value='medium' />
//       <Form.Radio label='Large' name='size' type='radio' value='large' />
//       <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
//     </Form.Group>
//   </Form>
// )

export default class Catalog extends Component {
  state = {
    filteredProducts: undefined,
    filters: [],
    filterIndex: 0
  }

  handleFilterClick = (e, titleProps) => {
    const { index } = titleProps
    const { filterIndex } = this.state
    const newIndex = filterIndex === index ? -1 : index

    this.setState({ filterIndex: newIndex })
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
    // console.log(this.state.checkout.subtotalPrice);
    const { filterIndex } = this.state;
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
            <div className="catalogHeader__imgWrap">
              <img src={heading} />
            </div>
            <h1>Catalog</h1>
          </div>
        </header>
        <div className="catalogCategory">
          <h2>
            <span>
              <Link to="/">Home</Link> &rarr; Catalog
            </span>
            <div>
              {this.props.products.length} results
            </div>
          </h2>
        </div>
        {/* {!this.state.isCartOpen && <button onClick={() => this.setState({ isCartOpen: true })}>Open Cart</button>} */}
        <main id="catalogMain">
          <div className="catalogFilter">
            <div className="filter">
              <label>Filter By</label>
              <ul>
                <li>Featured</li>
                <li className="filter__expands open">Category
                  <span>+</span>
                  <ul>
                    <li>All</li>
                    <li>Shirts</li>
                    <li onClick={() => this.filterProductsByType('shoes')}>Shoes</li>
                    <li>Bottoms</li>
                    <li>Accessories</li>
                  </ul>
                </li>
                <li className="filter__expands">Collection
                  <span>+</span>
                  <ul>
                    <li>All</li>
                    <li>Shirts</li>
                    <li onClick={() => this.filterProductsByType('shoes')}>Shoes</li>
                    <li>Bottoms</li>
                    <li>Accessories</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* if filtered is full, render that, if not render all products */}
          <Products
            products={this.state.filteredProducts ? this.state.filteredProducts : this.props.products}
            // products={this.props.products && this.state.filteredProducts}
            client={this.props.client}
            addVariantToCart={this.addVariantToCart}
          />
        </main>

        <Footer />
      </div>
    )
  }
}
// export const query = graphql`
//   query CatalogQuery {
//   allShopifyProduct {
//       edges {
//         node {
//           id
//           title
//           handle
//           productType
//           vendor
//           variants {
//             id
//             title
//             price
//           }
//         }
//       }
//     }
//   }
// `;