import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet'

import Footer from '../components/Footer/Footer';

import headerImage from '../assets/mile-high-boys-club2.png';

import './Culture.css';

export default class Culture extends Component {
  componentDidMount() {

    //add the dark style nav
    document.querySelector('.footer__links').classList.add('catalog');
    document.querySelector('.sideBar').classList.add('catalog');
    document.querySelector('.sideBar__btn').classList.add('catalog');
    document.querySelectorAll('li.topBar__link a').forEach(el => el.classList.add('catalog'));
  }
  render() {
    return (
      <div>
        <Helmet
          title="Mile High Boys Club | About us"
          meta={[
            { name: 'description', content: 'Mile High Boys Club official website and merch store. Browse our catalog' },
            { name: 'keywords', content: 'Mile High Boys Club, MHBC, MHBC Fashion, fashion' },
          ]}
        />
        <header className="about__header">
          <div className="about__headerImg">
            <img src={headerImage} />
          </div>
          <div className="about__headerTitle">
            <h1>About</h1>
            <p>learn about MHBC and the team running the show</p>
          </div>
        </header>
        <main className="about__main">
          <section className="about__content">
            <div className="left">
              <h2>
                Never limit yourself based on past circumstances
              </h2>
            </div>
            <div className="right">
              <p>
                MHBC was formed in atlanta in 2016 as a record label. The artists and management
                colluded based on the idea that you can achieve anything you set your mind to.
                Though their mantra, the record label was successful and produced hits listened to
                by millions.
              </p>
              <p>
                The CEO, Chris Thompson (Mr. P), also believed that how you present yourself
                speaks miles. By thinking and acting like a successful person, you can achieve
                success. Sadly however, the fashion industry was absent of a company that represented
                that theme. It seemed there were brands catered to the wealthy and the nons, no brands
                spoke to the creators, go-getters, and innovators; people who were wealthy but still
                striving to reach higher. With this in mind he decided to brand Mile high boys club
                and take on the fashion industry.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}