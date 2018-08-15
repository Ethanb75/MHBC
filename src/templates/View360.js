import React, { Component } from "react";
import Helmet from 'react-helmet';

import './View360.css';

import loader from '../assets/loading.svg';


// %3D === '='
// https://res.cloudinary.com/diorhtnjt/image/upload/v1534182289/MHBC/360%20Photos/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3OTkwNjU4OTQ5NzA%3D/8.jpg
const TOTAL_IMAGE_LENGTH = 35;
const BASE_URL = 'https://res.cloudinary.com/diorhtnjt/image/upload/v1534182289/MHBC/360%20Photos/'




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

    this.changeImagesWithSlide = this.changeImagesWithSlide.bind(this);

    for (let i = 0; i < TOTAL_IMAGE_LENGTH; i++) {
      imageURLs.push(`${BASE_URL}${productID.replace('=', '%3D')}/${i + 1}.jpg`);
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
    const rotateImages = imageURLs.map((image, index) => {
      return (
        <img
          data-number={index + 1}
          style={photoInView == index + 1 ? { opacity: 1 } : { opacity: 0 }}
          key={index}
          src={image}
          onLoad={() => this.setState({ loadedImages: this.state.loadedImages + 1 })}
        />
      )
    })


    return (
      <div className="rotateView">
        <Helmet
          title="360 view"
        />
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
            max="34"
            step="1"
            defaultValue="1"
            onChange={this.changeImagesWithSlide}
          />
        </div>
      </div>
    )
  }
}