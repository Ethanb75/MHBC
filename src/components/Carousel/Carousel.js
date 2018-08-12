import React, { Component } from 'react';
import './Carousel.css';

import cover1 from '../../assets/hat1-comp.jpg';
import cover2 from '../../assets/hats-comp.jpg';
import cover3 from '../../assets/hat2-comp.jpg';

let timeout;
const CAROUSEL_TIMER = 8000;


export default class Carousel extends Component {
  state = {
    currentSlide: 0,
    imageList: [cover1, cover2, cover3]
  }
  nextImage() {
    clearInterval(timeout);

    this.setState({
      currentSlide: this.state.currentSlide === this.state.imageList.length - 1 ? 0 : this.state.currentSlide + 1
    })

    timeout = setInterval(() => {
      this.setState({
        currentSlide: this.state.currentSlide === this.state.imageList.length - 1 ? 0 : this.state.currentSlide + 1
      })
    }, CAROUSEL_TIMER)
  }
  previousImage() {
    clearInterval(timeout);

    this.setState({
      currentSlide: this.state.currentSlide === 0 ? this.state.imageList.length - 1 : this.state.currentSlide - 1
    })

    timeout = setInterval(() => {
      this.setState({
        currentSlide: this.state.currentSlide === this.state.imageList.length - 1 ? 0 : this.state.currentSlide + 1
      })
    }, CAROUSEL_TIMER)
  }
  componentDidMount() {
    if (!timeout) {
      timeout = setInterval(() => {
        this.setState({
          currentSlide: this.state.currentSlide === this.state.imageList.length - 1 ? 0 : this.state.currentSlide + 1
        })
      }, CAROUSEL_TIMER)
    }

    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }
  render() {
    const { currentSlide, imageList } = this.state;
    const imageElements = imageList.map((imageSrc, index) => {
      return (
        <img
          src={imageSrc}
          style={currentSlide === index ? { opacity: 1 } : {}}
          alt=""
        />
      )
    });

    return (
      <div className="carouselWrap">
        {imageElements}
        <div className="carousel__controls">
          <div>
            <button onClick={this.previousImage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
            </button>
            <button onClick={this.nextImage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}