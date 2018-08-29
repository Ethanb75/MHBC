import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

// components
import Footer from '../components/Footer/Footer';

// css
import '../assets/main.css';

// static files
import featured1 from '../assets/test1.png';
import MHBC1 from '../assets/mile-high-boys-club.png';
import MHBC2 from '../assets/mile-high-boys-club2.png';
import MHBC3 from '../assets/mile-high-boys-club3.png';
import MHBC4 from '../assets/chris.jpg';
import twan from '../assets/twan-da-god.jpg';
import stickers from '../assets/stickers.jpg';
import designer from '../assets/designer.png';
import logoWht from '../assets/logo-wht.png';
import logoBlk from '../assets/logo-blk.png';

//slides

import slide1 from '../assets/slide1.jpeg';
import slide2 from '../assets/slide2.jpeg';
import slide3 from '../assets/slide2.jpg';
import slide4 from '../assets/slide3.jpeg';
import slide5 from '../assets/slide4.jpeg';

let backgroundArr = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5
]


export default class IndexPage extends Component {
  state = {
    backgroundNumber: 0,
    homepageCollection: {}
  }
  changeBackground() {
    if (this.state.backgroundNumber + 1 === backgroundArr.length) {
      this.setState({ backgroundNumber: 0 })
    } else {
      this.setState({ backgroundNumber: this.state.backgroundNumber + 1 });
    }
  }
  componentDidMount() {

    if (window.innerWidth >= 600) document.querySelector('.topBar__logo img').src = logoBlk;

    if (document.querySelector('.sideBar').classList.contains('catalog')) {
      document.querySelector('.footer__links').classList.remove('catalog');
      document.querySelector('.sideBar').classList.remove('catalog');
      document.querySelector('.sideBar__btn').classList.remove('catalog');
      document.querySelectorAll('li.topBar__link a').forEach(el => el.classList.remove('catalog'))
    }

    document.querySelector('.sideBar__cart svg').style.stroke = 'rgb(25,25,25)';
    document.querySelector('.sideBar__cart button span').style.color = 'rgb(25,25,25)';

    this.props.handleCartClose();
  }
  componentWillUnmount() {

    if (window.innerWidth >= 600) document.querySelector('.topBar__logo img').src = logoWht;

    document.querySelector('.sideBar__cart svg').style.stroke = '';
    document.querySelector('.sideBar__cart button span').style.color = '';
  }
  render() {
    const { backgroundNumber } = this.state;
    // console.log(this.props.collections[0]);

    // let homePageItems = this.props.collections[0].
    // if (this.props.collections[0]) {
    //   let collectionId = this.props.collections[0].id;
    //   this.props.client.collection.fetchWithProducts(collectionId).then((collection) => {
    //     // Do something with the collection
    //     console.log(collection);
    //     console.log(collection.products);
    //   });
    // }

    return (
      <div className="pageWrapper">
        <Helmet
          title="Mile High Boys Club"
          meta={[
            { name: 'description', content: 'Mile High Boys Club official website and merch store.' },
            { name: 'keywords', content: 'Mile High Boys Club, MHBC, MHBC Fashion, fashion' },
          ]}
        />
        <header id="indexHeader">
          <div className="header__title">
            <div>
              <h1>
                <span>Mile High</span>
                <span>Boys Club</span>
              </h1>
              <p>Mark of Excellence</p>
            </div>
            <div>
              <Link to="/en/Catalog">Catalog <span>&rarr;</span></Link>
            </div>
          </div>
          <div className="featured">
            <span>featured</span>
            <Link to="/en/Catalog">Stylin Jacket <span>&rarr;</span></Link>
          </div>
          <div className="background">
            {/* have a few slides and add the css class witht he animation after the prev. animation is complete */}
            <div className="background__slidingContent" style={{ backgroundImage: `url(${backgroundArr[backgroundNumber]})` }} onAnimationIteration={() => this.changeBackground()}></div>
          </div>
        </header>

        <main>
          {/* essentials area */}
          <div id="essentials">
            <div className="essentials__item intro">
              <em>the essentials</em>
              <h2>Threads to match your ambition</h2>
              <Link to="/en/Catalog">Shop Featured<span>→</span></Link>
            </div>
            <div className="essentials__item">
              <div className="essentials__photo">
                <img src={featured1} />
              </div>
              <div className="essentials__detials">
                <p className="fatCopy">Watch1</p>
              </div>
            </div>
            <div className="essentials__item">
              <div className="essentials__photo">
                <img src={featured1} />
              </div>
              <div className="essentials__detials">
                <p className="fatCopy">Watch2</p>
              </div>
            </div>
            <div className="essentials__item">
              <div className="essentials__photo">
                <img src={featured1} />
              </div>
              <div className="essentials__detials">
                <p className="fatCopy">Watch3</p>
              </div>
            </div>
          </div>

          <div id="catalog_caller">
            <div>
              <h2>browse our full catalog</h2>
            </div>
            <div>

              <Link to="/en/Catalog">Product Catalog<span>→</span></Link>
            </div>
          </div>

          <div id="designer">
            <div>
              <img src={designer} />
            </div>
            <div className="designer__info">
              <em>the designer</em>
              <h2>A world class designer, making trends and not following hype.</h2>
              <button>Learn More<span>→</span></button>
            </div>
          </div>

          <div id="culture">
            <div>
              <div className="culture__header">
                @milehigh_boysclub
              </div>
              <div className="culture__left">
                <img src={MHBC1} />
                <div className="culture__info">
                  <em>the brand</em>
                  <h2>A club of individuals bonded by dreams, motivation, determination, dedication, ambition and status.</h2>
                  <a href="https://www.instagram.com/milehigh_boysclub/">Instagram<span>→</span></a>
                </div>
                <img src={twan} />
              </div>
              <div className="culture__right">
                <img src={MHBC2} style={{ zIndex: 10 }} />
                <img src={MHBC3} />
                <img src={stickers} />
              </div>
            </div>
            <p className="culture__more">for more, browse our <a href="https://www.instagram.com/milehigh_boysclub/">Instagram.</a></p>
          </div>


          <div className="productCaller">
            <Link>
              <div className="productCaller__back"></div>
              <div className="productCaller__title">
                <h3>Apparel</h3>
                <button>Browse Apparel<span>→</span></button>
              </div>
            </Link>
            <Link>
              <div className="productCaller__back"></div>
              <div className="productCaller__title">
                <h3>Accessories</h3>
                <button>Browse Accessories<span>→</span></button>
              </div>
            </Link>
          </div>

          <div id="caller">
            <div>
              <h2>Join our mailing list to stay up to date on new releases</h2>
            </div>
            <div>
              <form action="https://milehighboysclub.us18.list-manage.com/subscribe/post?u=6a934b18b1227fc6b2773aec3&amp;id=1e5daf0657" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
                <div className="signupWrap">
                  <div className="mc-field-group">
                    <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />
                  </div>
                  <div id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                    <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                  </div>
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true" ><input type="text" name="b_6a934b18b1227fc6b2773aec3_1e5daf0657" tabIndex="-1" value="" /></div>
                  <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}
