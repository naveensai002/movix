import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../swicthTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
  const [endPoint, setEndPoint] = useState('movie');
  const { loading, data } = useFetch(`/${endPoint}/popular`);

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Movie' ? 'movies' : 'tv');
  };
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>What's Popular</span>
        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
