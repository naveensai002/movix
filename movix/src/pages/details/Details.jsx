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
  const { mediaType, id } = useParams();
  console.log(mediaType);
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

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
