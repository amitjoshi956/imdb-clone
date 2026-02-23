import { Link } from "react-router-dom";
import { useWatchlist } from "@common/hooks";
import MovieCard from "@components/MovieCard";

function Watchlist() {
  const { watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-950 gap-5 px-6">
        <p className="text-2xl font-bold text-white">Your watchlist is empty</p>
        <p className="text-gray-400 text-center max-w-md">
          Browse movies and click the{" "}
          <span className="text-amber-400 font-bold">+</span> button to save
          your favorite movies to your watchlist.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-lg bg-amber-400 px-8 py-3 text-lg font-semibold text-gray-950 shadow-lg transition hover:bg-amber-300 hover:scale-105"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen px-6 md:px-12 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        My Watchlist
        <span className="ml-3 text-lg font-normal text-gray-500">
          ({watchlist.length})
        </span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isWatchlisted={isInWatchlist(movie.id)}
            onAddToWatchlist={addToWatchlist}
            onRemoveFromWatchlist={removeFromWatchlist}
          />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
