import { TMDB_IMAGE_BASE_URL } from "@base/const";
import type { ImageSize, TrendingMovies } from "@base/types";
import HttpService from "./http-service";

export const getTmdbImageUrl = (path: string, size: ImageSize = "original") =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`;

export const fetchTrendingMovies = async (page: number = 1) => {
  const response = await HttpService.get<TrendingMovies>(
    "/trending/movie/day",
    {
      params: { page },
    },
  );
  return response.data;
};
