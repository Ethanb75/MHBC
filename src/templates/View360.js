import React, { Component } from "react";
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import './View360.css';

import loader from '../assets/loading.svg';


const TOTAL_IMAGE_LENGTH = 35;
// const BASE_URL = 'https://res.cloudinary.com/diorhtnjt/image/upload/v1534182289/MHBC/360%20Photos/'
const BASE_URL = 'https://res.cloudinary.com/diorhtnjt/image/upload/v1534782717/MHBC/360%20Photos/'




export default class View360 extends Component {
  state = {
    photoInView: 1,
    imageURLs: [],
    loadedImages: 0,
    product: undefined
  }
  changeImagesWithSlide(ev) {
    this.setState({
      photoInView: ev.target.value
    })
  }
  componentDidMount() {
    const imageURLs = [];
    const productID = this.props.pathContext.id.replace('Shopify__Product__', '');

    console.log(productID);

    this.changeImagesWithSlide = this.changeImagesWithSlide.bind(this);


    // NEED TO FIX THIS, SPECIAL CASE FOR THE ONE HAT WITH 32 PICTURES INSTEAD OF 35
    if (productID === 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE4MDcyMDE0MDI5Mzg=') {
      for (let i = 0; i < 32; i++) {
        imageURLs.push(`${BASE_URL}${productID.replace('=', '%3D')}/${i + 1}.jpg`);
      }
    } else {
      for (let i = 0; i < TOTAL_IMAGE_LENGTH; i++) {
        imageURLs.push(`${BASE_URL}${productID.replace('=', '%3D')}/${i + 1}.jpg`);
      }
    }


    this.setState({ imageURLs })

    if (this.state.product) {
      this.state.product.options.forEach((selector) => {
        defaultOptionValues[selector.name] = selector.values[0].value;
      });
    } else {
      this.props.client.product.fetch(productID).then((product) => {
        this.setState({
          product
        })
      });
    }
  }
  render() {
    const { photoInView, imageURLs } = this.state;
    const allImagesLoaded = imageURLs.length === this.state.loadedImages;

    console.log(imageURLs);

    const rotateImages = imageURLs.map((image, index) => {
      return (
        <img
          data-number={index + 1}
          style={photoInView == index + 1 ? { opacity: 1 } : { opacity: 0 }}
          key={index}
          src={image}
          onLoad={() => this.setState({ loadedImages: this.state.loadedImages + 1 })}
        />
      );
    });

    return (
      <div className="rotateView">
        <Helmet
          title="360 view"
        />
        <div className="productView__return rotateView__return">
          <Link to={this.props.location.pathname.replace('/360-view', '')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
        </div>
        <div className="rotateView__title">
          <h2>{this.state.product ? this.state.product.title : 'loading...'}</h2>
        </div>
        <div
          className='rotateView__photoList'
        >
          <div className={allImagesLoaded ? "rotateView__photoWrap loaded" : "rotateView__photoWrap"}>
            {rotateImages}
          </div>
          <div className={allImagesLoaded ? "rotateView__loader loaded" : "rotateView__loader"}>
            <img src={loader} />
          </div>
        </div>
        <div>
          <input
            name="orientation-slider"
            type="range"
            min="1"
            //needs to be the number of photos
            max={imageURLs.length}
            step="1"
            defaultValue="1"
            onChange={this.changeImagesWithSlide}
          />
        </div>
      </div>
    )
  }
}