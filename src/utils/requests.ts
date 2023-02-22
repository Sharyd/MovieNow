import axios from 'axios';
import { PageType, QueryKeyType, ResultsMovies } from 'types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`,
  news: `${BASE_URL}/movie/latest?api_key=${API_KEY}&language=en-US`,
  searchMovie: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`,
  genreOfMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`,
  popularTV: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=`,
  topRatedTV: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=`,
};

//TV SHOWS
export const fetchPopularTV = async ({ pageParam = 1 }): Promise<any> => {
  return axios.get(requests.popularTV + pageParam);
};
export const fetchTopRatedTV = async ({ pageParam = 1 }): Promise<any> => {
  return axios.get(requests.topRatedTV + pageParam);
};

export const fetchTVDetail = async ({
  queryKey,
}: QueryKeyType): Promise<any> => {
  const [_, id] = queryKey;

  return axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
};

//MOVIES
export const fetchNowPlayingMovies = async ({
  pageParam = 1,
}): Promise<any> => {
  return axios.get(requests.nowPlaying + pageParam);
};
export const fetchTopRatedMovies = async ({ pageParam = 1 }): Promise<any> => {
  return axios.get(requests.topRated + pageParam);
};
export const fetchNewMovies = async ({ pageParam = 1 }): Promise<any> => {
  return axios.get(requests.nowPlaying + pageParam);
};
export const fetchQueryMovies = async (
  query: string | string[] | undefined
): Promise<any> => {
  return axios.get(requests.searchMovie + query);
};

export const fetchByGenreOfMovie = async (
  pageParam: number | undefined,
  query: string | string[] | undefined
): Promise<ResultsMovies> => {
  return axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${query}&page=${pageParam}`
  );
};
export const fetchByGenreOfTV = async (
  pageParam: number | undefined,
  query: string | string[] | undefined
): Promise<any> => {
  return axios.get(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${query}&page=${pageParam}`
  );
};

export const fetchMovieDetail = async ({
  queryKey,
}: QueryKeyType): Promise<any> => {
  const [_, id] = queryKey;

  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
};

export type Identificator = 'movie' | 'tvShow';
