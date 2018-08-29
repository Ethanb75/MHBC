import React, { Component } from 'react'
import Link from 'gatsby-link'
import SelectLanguage from '../SelectLanguage';

import './Header.css';

import logo from '../../assets/logo-wht.png';
import logoMobile from '../../assets/logo-blk.png';


// import client from '../../shopify';
import Cart from '../Cart/Cart';

export default class Header extends Component {
  state = {
    isNavOpen: false,
    cartItems: 0
  }

  componentDidMount() {
    // if (window.localStorage.getItem('checkoutId')) {
    //   client.checkout.fetch(window.localStorage.getItem('checkoutId')).then((checkout) => {
    //     console.log(checkout.attrs)
    //     this.setState({ cartItems: checkout.attrs.lineItems.length })
    //   });
    // }
  }
  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
    document.getElementsByTagName('html')[0].classList.toggle('noscroll');
  }

  handleLinkClick() {
    this.setState({ isNavOpen: false });
    this.handleCartClose();
  }

  countLineItems() {
    let cartItems = 0;
    if (this.props.checkout.attrs) {
      this.props.checkout.attrs.lineItems.forEach(item => {
        cartItems = cartItems + item.attrs.quantity.value;
      });
    }
    return cartItems;
  }

  render() {
    const { isNavOpen } = this.state;

    return (
      <div className="nav">
        <div className="topBar">
          <h1 className="topBar__logo">
            <Link to="/">
              {window.innerWidth <= 600 ? <img src={logoMobile} /> : <img src={logo} />}
            </Link>
          </h1>
          <ul>
            <li className="topBar__link">
              <Link to="/en/" exact activeClassName="active">Home</Link>
            </li>
            <li className="topBar__link">
              <Link to="/en/Catalog" activeClassName="active">
                Catalog
              </Link>
            </li>
            <li className="topBar__link">
              <Link to="/en/Culture" activeClassName="active">
                Culture
              </Link>
            </li>
            {/* <li className="topBar__lang"><SelectLanguage langs={this.props.langs} /></li> */}
          </ul>
        </div>

        <div className={isNavOpen ? "menu open" : "menu"}>
          <div>
            <ul>
              <li>
                <Link to="/" onClick={() => this.toggleNav()} activeClassName="active">Home</Link>
              </li>
              <li>
                <Link to="/en/Catalog" onClick={() => this.toggleNav()} activeClassName="active">Catalog</Link>
              </li>
              <li>
                <Link to="/en/Culture" onClick={() => this.toggleNav()} activeClassName="active">Culture</Link>
              </li>
              <li>
                <span onClick={() => {
                  if (!this.props.isCartOpen) this.props.toggleCart();
                  this.toggleNav();
                }}>
                  Cart
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <a href="">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/milehigh_boysclub/">Instagram</a>
              </li>
              <li>
                <a href="">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sideBar__btn">
          <button className={isNavOpen && 'open'} onClick={() => this.toggleNav()}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="sideBar">
          <div className="sideBar__cart">
            <button onClick={this.props.toggleCart}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFF6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>{this.countLineItems()}</span>
            </button>
          </div>
          <ul>
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
            <li>
              <a href="">Twitter</a>
            </li>
          </ul>
        </div>

        <Cart
          checkout={this.props.checkout}
          isCartOpen={this.props.isCartOpen}
          handleCartClose={this.props.handleCartClose}
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
        />
      </div>
    )
  }
};
