import React from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosection/VideoSection';
import Recommendation from './Carousels/Recommendation';
import Similar from './Carousels/Similar';

const Details = () => {
  const params = useParams();

  const { mediaType, id } = params;
  // console.log(mediaType, id);

  const { loading, data } = useFetch(`/${mediaType}/${id}/videos`);
  // console.log(data?.results);

  const { loading: creditsLoading, data: credits } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  // console.log(data);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
