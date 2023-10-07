import { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading('Loading...');
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [url]);
  return { loading, error, data };
};
export default useFetch;
