import React from 'react';
import './styles.scss';

import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
    </div>
  );
};

export default Home;
