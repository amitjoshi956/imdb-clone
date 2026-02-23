import { TMDB_IMAGE_BASE_URL } from "@base/const";
import type { ImageSize, MovieDetails, MovieListResponse } from "@base/types";
import HttpService from "./http-service";

export const getTmdbImageUrl = (path: string, size: ImageSize = "original") =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`;

const fetchMovieList = async (endpoint: string, page: number = 1) => {
  const response = await HttpService.get<MovieListResponse>(endpoint, {
    params: { page },
  });
  return response.data;
};

export const fetchTrendingMovies = (page: number = 1) =>
  fetchMovieList("/trending/movie/day", page);

export const fetchNowPlayingMovies = (page: number = 1) =>
  fetchMovieList("/movie/now_playing", page);

export const fetchPopularMovies = (page: number = 1) =>
  fetchMovieList("/movie/popular", page);

export const fetchTopRatedMovies = (page: number = 1) =>
  fetchMovieList("/movie/top_rated", page);

export const fetchUpcomingMovies = (page: number = 1) =>
  fetchMovieList("/movie/upcoming", page);

export const fetchMovieDetails = async (movieId: number) => {
  const response = await HttpService.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};
