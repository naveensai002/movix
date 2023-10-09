import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './styles.scss';

import CircleRating from '../../../components/circleRating/CircleRating';

import PosterFallback from '../../../assets/no-poster.png';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImages/Img';
import { PlayIcon } from '../playBtn/PlayIcon';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({ video, crew }) => {
  const { url } = useSelector((state) => state.home);

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  // console.log(data?.genres);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  const director = crew?.filter((f) => f?.job === 'Director');

  const writer = crew?.filter(
    (d) => d?.job === 'Screenplay' || d?.job === 'Story' || d?.job === 'Writer'
  );

  // console.log(director, writer);
  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          {!!data && (
            <div className='backdrop-img'>
              <Img src={url?.backdrop + data?.backdrop_path} />
            </div>
          )}
          <div className='opacity-layer'></div>
          <ContentWrapper>
            <div className='content'>
              <div className='left'>
                {data?.poster_path ? (
                  <Img
                    className='posterImg'
                    src={url?.backdrop + data?.poster_path}
                  />
                ) : (
                  <Img className='posterImg' src={PosterFallback} />
                )}
              </div>
              <div className='right'>
                <div className='title'>{`${data?.name || data?.title}(${dayjs(
                  data?.release_date
                ).format('YYYY')})`}</div>
                <div className='subtitle'>{data?.tagline}</div>
                <div className='genres'>
                  {data?.genres?.map((name) => {
                    return <p key={name?.id}>{name?.name}</p>;
                  })}
                </div>
                <div className='row'>
                  <CircleRating rating={data?.vote_average?.toFixed(1)} />
                  <div
                    className='playbtn'
                    onClick={() => {
                      setShow(true);
                      setVideoId(video?.key);
                    }}
                  >
                    <PlayIcon />
                    <span className='title'>Watch Trailer</span>
                  </div>
                </div>
                <div className='overview'>
                  <div className='heading'>Overview</div>
                  <div className='description'>{data?.overview}</div>

                  <div className='info'>
                    {data?.status && (
                      <div className='infoItem'>
                        <span className='text bold'>Status:{''}</span>
                        <span className='text'>{data?.status}</span>
                      </div>
                    )}

                    {data?.release_date && (
                      <div className='infoItem'>
                        <span className='text bold'>Release:{''}</span>
                        <span className='text'>
                          {dayjs(data?.release_date).format('MMMM D, YYYY')}
                        </span>
                      </div>
                    )}

                    {data?.runtime && (
                      <div className='infoItem'>
                        <span className='text bold'>Runtime:{''}</span>
                        <span className='text'>
                          {toHoursAndMinutes(data?.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {director?.length > 0 && (
                  <div className='info'>
                    <span className='text bold'>Director :{''}</span>
                    <span className='text'>
                      {director?.map((d, i) => (
                        <span key={i}>
                          {d?.name}
                          {director?.length - 1 !== i && ','}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {writer?.length > 0 && (
                  <div className='info'>
                    <span className='text bold'>writer :{''}</span>
                    <span className='text'>
                      {writer?.map((d, i) => (
                        <span key={i}>
                          {d?.name}
                          {writer?.length - 1 !== i && ','}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ContentWrapper>
          <VideoPopup
            show={show}
            videoId={videoId}
            setShow={setShow}
            setVideoId={setVideoId}
          />
        </>
      ) : (
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right'>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
