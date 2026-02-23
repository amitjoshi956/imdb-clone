import { useMemo, useState } from "react";
import { StorageKeys } from "@base/const";
import type { Movie } from "@base/types";
import StorageUtil from "@common/utils/storage";

type WatchlistMap = Record<number, Movie>;

const readWatchlist = (): WatchlistMap =>
  StorageUtil.getItem<WatchlistMap>(StorageKeys.WATCHLIST) ?? {};

const persistWatchlist = (map: WatchlistMap) =>
  StorageUtil.setItem(StorageKeys.WATCHLIST, map);

export const useWatchlist = () => {
  const [watchlistMap, setWatchlistMap] = useState<WatchlistMap>(readWatchlist);

  const watchlist = useMemo(() => Object.values(watchlistMap), [watchlistMap]);

  const isInWatchlist = (movieId: number) => movieId in watchlistMap;

  const addToWatchlist = (movie: Movie) => {
    setWatchlistMap((prev) => {
      if (movie.id in prev) return prev;
      const next = { ...prev, [movie.id]: movie };
      persistWatchlist(next);
      return next;
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlistMap((prev) => {
      if (!(movieId in prev)) return prev;
      const { [movieId]: _, ...next } = prev;
      persistWatchlist(next);
      return next;
    });
  };

  return { watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist };
};
