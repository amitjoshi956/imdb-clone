import type { FC } from "react";
import type { Movie } from "@base/types";
import { getTmdbImageUrl } from "@services/.";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { title, vote_average, poster_path } = movie;
  const posterSrc = getTmdbImageUrl(poster_path, "w500");

  return (
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
        <span className="text-sm font-bold text-white">{vote_average}</span>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent px-3 py-4">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
