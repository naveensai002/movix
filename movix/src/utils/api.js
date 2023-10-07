import axios from 'axios';
import { toast } from 'sonner';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzgzMzVjZDdiYWU0MTczZGRiMmM4ZDczYjJjMWY3MyIsInN1YiI6IjYzZGU1ZDRlY2U1ZDgyMDBjZDhmZjkxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOUgFEQP-PK1lWN-7pdxWDPGPKqgqx4cXybG61W9Cvc';

const headers = {
  Authorization: 'bearer ' + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    // console.log(err);
    toast.error(err.message);
    return err;
  }
};
