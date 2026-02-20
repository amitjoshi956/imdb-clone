export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

export type TrendingMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type ImageSize = "original" | "w1280" | "w780" | "w500" | "w300";
