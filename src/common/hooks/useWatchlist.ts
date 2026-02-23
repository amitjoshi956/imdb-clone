import { useState } from "react";
import { StorageKeys } from "@base/const";
import type { Movie } from "@base/types";
import StorageUtil from "@common/utils/storage";

const readWatchlist = (): Movie[] =>
  StorageUtil.getItem<Movie[]>(StorageKeys.WATCHLIST) ?? [];

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>(readWatchlist);

  const isInWatchlist = (movieId: number) =>
    watchlist.some((m) => m.id === movieId);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const next = [...prev, movie];
      StorageUtil.setItem(StorageKeys.WATCHLIST, next);
      return next;
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => {
      const next = prev.filter((m) => m.id !== movieId);
      StorageUtil.setItem(StorageKeys.WATCHLIST, next);
      return next;
    });
  };

  return { watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist };
};
