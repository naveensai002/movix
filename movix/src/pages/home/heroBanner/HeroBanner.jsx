import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImages/Img';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
Img;

const HeroBanner = () => {
  const { url } = useSelector((store) => store.home);
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const { data, loading } = useFetch('/movie/upcoming');
  // console.log(data?.results);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    // console.log(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className='heroBanner'>
      <div className='backdrop-img'>{!loading && <Img src={background} />}</div>
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>
            Millions of Movies,shows and people to discover. Explore Now.
          </span>
          <div className='searchInput'>
            <input
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              onKeyUp={searchQueryHandler}
              type='search'
              placeholder='Search for a movie or Tv show....'
            />
            <button type='button'>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
