import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MovieDetails as MovieDetailsType } from "@base/types";
import { fetchMovieDetails, getTmdbImageUrl } from "@services/.";
import { formatCurrency, formatRuntime } from "@common/utils/conversions";
import PageLoader from "@components/PageLoader";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    fetchMovieDetails(Number(id))
      .then(setMovie)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-4">
        <p className="text-xl text-gray-400">Couldn't load movie details.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-amber-400 px-6 py-2 font-semibold text-gray-950 transition hover:bg-amber-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, "original");
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date?.split("-")[0];

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* ── Backdrop Hero ── */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-gray-950/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-gray-950/80"
        >
          ← Back
        </button>
      </section>

      {/* ── Main Content ── */}
      <section className="relative z-10 -mt-32 px-6 md:px-16 lg:px-24 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0 self-start">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-56 md:w-64 rounded-xl shadow-2xl shadow-black/60 border-2 border-gray-800"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 pt-4 md:pt-10">
            {/* Title + Year */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {movie.title}
              {releaseYear && (
                <span className="ml-3 text-xl md:text-2xl font-normal text-gray-400">
                  ({releaseYear})
                </span>
              )}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-lg italic text-gray-400">{movie.tagline}</p>
            )}

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-amber-400 border border-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mt-1">
              {/* Rating */}
              <div className="flex items-center gap-1.5 rounded-lg bg-amber-400/10 px-3 py-1.5">
                <span className="text-amber-400 text-base">★</span>
                <span className="text-amber-400 font-bold text-base">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500 text-xs">
                  / 10 ({movie.vote_count.toLocaleString()})
                </span>
              </div>

              <span className="text-gray-600">•</span>
              <span>{formatRuntime(movie.runtime)}</span>

              <span className="text-gray-600">•</span>
              <span>{movie.release_date}</span>

              <span className="text-gray-600">•</span>
              <span className="capitalize">{movie.status}</span>
            </div>

            {/* Homepage link */}
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition mt-1 w-fit"
              >
                Visit Official Site ↗
              </a>
            )}
          </div>
        </div>

        {/* ── Overview ── */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed max-w-4xl text-base">
            {movie.overview}
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          {[
            { label: "Budget", value: formatCurrency(movie.budget) },
            { label: "Revenue", value: formatCurrency(movie.revenue) },
            { label: "Language", value: movie.original_language.toUpperCase() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-gray-900 border border-gray-800 p-5"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Production Companies ── */}
        {movie.production_companies.filter((c) => c.logo_path).length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-4">
              Production Companies
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              {movie.production_companies
                .filter((company) => company.logo_path)
                .map((company) => (
                  <div
                    key={company.id}
                    className="flex flex-col items-center gap-2"
                    title={company.name}
                  >
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-gray-800 p-4 flex items-center justify-center h-16 w-28">
                      <img
                        src={getTmdbImageUrl(company.logo_path!, "w300")}
                        alt={company.name}
                        className="max-h-10 max-w-full object-contain brightness-0 invert"
                      />
                    </div>
                    <span className="text-xs text-gray-500 text-center leading-tight max-w-[7rem]">
                      {company.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetails;
