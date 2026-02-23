import { useWatchlist, useMovieCategory } from "@common/hooks";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "@services/.";
import type { Movie } from "@base/types";
import { FETCH_THRESHOLD } from "@base/const";
import Carousel from "@components/Carousel";
import MovieCard from "@components/MovieCard";

const categories = [
  { title: "Now Playing", fetchFn: fetchNowPlayingMovies },
  { title: "Popular", fetchFn: fetchPopularMovies },
  { title: "Top Rated", fetchFn: fetchTopRatedMovies },
  { title: "Upcoming", fetchFn: fetchUpcomingMovies },
] as const;

function CategoryCarousel({
  title,
  fetchFn,
}: {
  title: string;
  fetchFn: (page: number) => ReturnType<typeof fetchNowPlayingMovies>;
}) {
  const { items, hasMore, loadMore } = useMovieCategory(
    fetchFn,
    FETCH_THRESHOLD,
  );
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  return (
    <Carousel
      title={title}
      items={items}
      hasMore={hasMore}
      keyExtractor={(movie: Movie) => movie.id}
      onLoadMore={loadMore}
      renderItem={(movie: Movie) => (
        <MovieCard
          movie={movie}
          isWatchlisted={isInWatchlist(movie.id)}
          onAddToWatchlist={addToWatchlist}
          onRemoveFromWatchlist={removeFromWatchlist}
        />
      )}
    />
  );
}

function Movies() {
  return (
    <div className="bg-gray-950 min-h-screen py-10 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-white mb-4 px-6 md:px-12">
        Movies
      </h1>
      {categories.map(({ title, fetchFn }) => (
        <CategoryCarousel key={title} title={title} fetchFn={fetchFn} />
      ))}
    </div>
  );
}

export default Movies;
