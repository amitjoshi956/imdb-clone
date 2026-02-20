import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_HERO, TRENDING_MOVIES_LIMIT } from "@base/const";
import type { Movie } from "@base/types";
import { fetchTrendingMovies, getTmdbImageUrl } from "@services/.";
import MovieCard from "@components/MovieCard";
import Pagination from "@components/Pagination";

type HeroMovie = {
  title: string;
  overview: string;
  imgSrc: string;
};

function Home() {
  const [offset, setOffset] = useState(0);
  const [heroMovie, setHeroMovie] = useState<HeroMovie>(DEFAULT_HERO);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const page = Math.floor(offset / TRENDING_MOVIES_LIMIT) + 1;

    fetchTrendingMovies(page)
      .then((data) => {
        setTrendingMovies(data.results);
        setTotalCount(data.total_results);

        if (page === 1 && data.results.length > 0) {
          const movie = data.results[0];
          setHeroMovie({
            title: movie.title,
            overview: movie.overview,
            imgSrc: getTmdbImageUrl(movie.backdrop_path, "original"),
          });
        }
      })
      .catch(() => {
        setTrendingMovies([]);
        if (page === 1) setHeroMovie(DEFAULT_HERO);
      });
  }, [offset]);

  return (
    <div className="bg-gray-950">
      {/* Hero Banner */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={heroMovie.imgSrc}
          alt={heroMovie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
            {heroMovie.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
            {heroMovie.overview}
          </p>
          <Link
            to="/movies"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-8 py-3 text-lg font-semibold text-gray-950 shadow-lg transition hover:bg-amber-300 hover:scale-105"
          >
            Browse Movies
          </Link>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="px-6 md:px-12 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Trending Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination
          totalCount={totalCount}
          limit={TRENDING_MOVIES_LIMIT}
          offset={offset}
          onPageChange={setOffset}
        />
      </section>
    </div>
  );
}

export default Home;
