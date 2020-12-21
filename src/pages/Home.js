import React from 'react';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import HeroImage from '../images/hero.jpg';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FeatureProducts from '../components/Products/FeatureProducts';

const Home = () => {
  return (
    <React.Fragment>
      <Hero img={HeroImage}>
        <Banner
          header='Your number one Techno shop in the town'
          secondary='Best deals and powerful new products every day!'
        >
          <Button>
            <Link to='/'>Shop now</Link>
          </Button>
        </Banner>
      </Hero>
      <FeatureProducts />
    </React.Fragment>
  );
};

export default Home;
