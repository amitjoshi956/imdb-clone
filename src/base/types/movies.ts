export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type ImageSize = "original" | "w1280" | "w780" | "w500" | "w300";

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type MovieDetails = Movie & {
  tagline: string;
  genres: Genre[];
  runtime: number;
  vote_count: number;
  budget: number;
  revenue: number;
  status: string;
  homepage: string;
  production_companies: ProductionCompany[];
  original_language: string;
};
