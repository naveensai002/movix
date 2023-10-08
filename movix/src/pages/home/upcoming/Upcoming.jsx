import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../swicthTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Upcoming = () => {
  const [endPoint, setEndPoint] = useState('movie');
  const { loading, data } = useFetch(`/${endPoint}/upcoming`);

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Movie' ? 'movie' : 'tv');
  };
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Upcoming</span>
        <SwitchTabs data={['Movie', 'TV Shows']} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Upcoming;
