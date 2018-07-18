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
import designer from '../assets/designer.png';

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
    backgroundNumber: 0
  }
  changeBackground() {
    if (this.state.backgroundNumber + 1 === backgroundArr.length) {
      this.setState({ backgroundNumber: 0 })
    } else {
      this.setState({ backgroundNumber: this.state.backgroundNumber + 1 });
    }
  }
  componentDidMount() {
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
    document.querySelector('.sideBar__cart svg').style.stroke = '';
    document.querySelector('.sideBar__cart button span').style.color = '';
  }
  render() {
    const { backgroundNumber } = this.state;
    console.log(this.props.working);
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
          <div className="title">
            <h1>MHBC</h1>
            <p>
              MHBC is more than a brand it's a lifestyle. A club of individuals bonded by dreams,
              motivation, determination, dedication, ambition and status. 🛫
            </p>
            <div>
              <Link to="/en/Catalog">Catalog <span>&rarr;</span></Link>
            </div>
          </div>
          <div className="featured">
            <span>featured</span>
            <Link to="/en/Catalog">Stylin Jacket <span>&rarr;</span></Link>
            <img src="https://cdn.shopify.com/s/files/1/0141/0855/7370/products/pre_launch_bold.jpg?v=1531414253" />
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
              </div>
              <div className="culture__right">
                <img src={MHBC2} style={{ zIndex: 10 }} />
                <img src={MHBC3} />
              </div>
            </div>
          </div>

          <div id="caller">
            <div>
              <h2>Join our mailing list to stay up to date on new releases</h2>
            </div>
            <div>
              <input type="text"></input>
              <button>join now</button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}
