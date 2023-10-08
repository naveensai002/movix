import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

import ContentWrapper from '../contentWrapper/contentWrapper';
import Img from '../../components/lazyLoadImages/Img';
import PosterFallback from '../../assets/no-poster.png';
import './styles.scss';

import dayjs from 'dayjs';

const Carousel = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();
  const carouselRef = useRef();

  const navigation = (dir) => {};

  return (
    <div className='carousel'>
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          onClick={() => {
            navigation('left');
          }}
          className='carouselLeftNav arrow'
        />
        <BsFillArrowRightCircleFill
          onClick={() => {
            navigation('right');
          }}
          className='carouselRightNav arrow'
        />
        {!loading ? (
          <div className='carouselItems'>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className='carouselItem'>
                  <div>
                    <div className='posterBlock'>
                      <Img src={posterUrl} />
                    </div>
                    <div className='textBlock'>
                      <span className='title'>{item.title || item.name}</span>
                      <span className='date'>
                        {dayjs(item.release_date).format('MMM D, YYYY')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <span>Loading</span>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
