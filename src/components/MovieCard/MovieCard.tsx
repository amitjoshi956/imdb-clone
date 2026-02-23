import type { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@base/types";
import { getTmdbImageUrl } from "@services/.";

type MovieCardProps = {
  movie: Movie;
  isWatchlisted?: boolean;
  onAddToWatchlist?: (movie: Movie) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
};

const MovieCard: FC<MovieCardProps> = ({
  movie,
  isWatchlisted = false,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}) => {
  const { id, title, vote_average, poster_path } = movie;
  const posterSrc = getTmdbImageUrl(poster_path, "w500");

  const handleWatchlistClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWatchlisted) {
      onRemoveFromWatchlist?.(id);
    } else {
      onAddToWatchlist?.(movie);
    }
  };

  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="group relative rounded-lg overflow-hidden bg-gray-900 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* Poster Image */}
        <div className="aspect-[2/3] w-full">
          <img
            src={posterSrc}
            alt={title}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            loading="lazy"
          />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-gray-950/80 px-2 py-1 backdrop-blur-sm">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-sm font-bold text-white">
            {Number(vote_average).toFixed(1)}
          </span>
        </div>

        {/* Watchlist Button */}
        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-sm text-lg font-bold transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isWatchlisted
              ? "bg-amber-400 text-gray-950 hover:bg-red-500 hover:text-white"
              : "bg-gray-950/70 text-white hover:bg-amber-400 hover:text-gray-950"
          }`}
          title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isWatchlisted ? "✕" : "+"}
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent px-3 py-4">
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
