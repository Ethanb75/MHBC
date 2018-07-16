import React from 'react'
import Link from 'gatsby-link'

import './Footer.css';

const Footer = () => (
  <footer id="footer">
    <div className="footer__quote">
      <h4>MHBC</h4>
    </div>
    <div className="footer__links">
      <div className="footer__location">
        <p>
          <a href="mailto:contact@milehighboysclub.com">
            contact@milehighboysclub.com
          </a>
        </p>
        <p>
          <a href="+1111111111">
            (678) 633 - 1111
          </a>
        </p>
        <div>
          <span>
            <a href="">Facebook</a>
          </span>
          <span>
            <a href="">Instagram</a>
          </span>
          <span>
            <a href="">Twitter</a>
          </span>
        </div>
      </div>
      <ul>
        {/* possibly no label */}
        <label></label>
        <li>Home</li>
        <li>About</li>
        <li>Catalog</li>
        <li>{/*mail to link for now*/}Careers</li>
      </ul>
      <ul>
        {/* possibly no label */}
        <label></label>
        <li>Warranty</li>
        <li>Shipping Policy</li>
        <li>Return Policy</li>
        <li>Terms & Conditions</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
