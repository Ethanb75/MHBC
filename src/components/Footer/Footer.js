import React from "react";
import Link from "gatsby-link";

import "./Footer.css";

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
          <a href="tel:+4049016888">(404) 901 - 6888</a>
        </p>
        <div>
          <span>
            <a href="">Facebook</a>
          </span>
          <span>
            <a href="https://www.instagram.com/milehigh_boysclub/">Instagram</a>
          </span>
          <span>
            <a href="">Twitter</a>
          </span>
        </div>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/en/Culture">About</Link>
        </li>
        <li>
          <Link to="/en/Catalog">Catalog</Link>
        </li>
        <li>
          <a href="mailto:milehighboysclub@gmail.com">Careers</a>
        </li>
      </ul>
      <ul>
        <li>Shipping Policy</li>
        <li>Return Policy</li>
        <li>Terms & Conditions</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
