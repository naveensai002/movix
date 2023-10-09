import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/contentWrapper';
import noResults from '../../assets/no-results.png';

import './styles.scss';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: { ...data?.results, ...res?.results } });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        console.log(res);
        setData(res);
        setPageNum((prev) => prev + 1);
      }
    );
    setLoading(false);
  };

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`search ${
                  data?.total_results > 1 ? 'results' : 'result'
                } of ${query}`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
              >
                {data?.results.map((item, i) => {
                  if (item.media_type === 'person') return;
                  return <MovieCard key={i} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>Sorry, Result not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
