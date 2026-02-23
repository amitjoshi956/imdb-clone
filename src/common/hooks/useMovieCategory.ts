import { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "@base/types";
import type { MovieListResponse } from "@base/types";

type FetchFn = (page: number) => Promise<MovieListResponse>;

export const useMovieCategory = (fetchFn: FetchFn, fetchThreshold: number) => {
  const [items, setItems] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadPage = useCallback(
    async (pageNum: number) => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      try {
        const data = await fetchFn(pageNum);
        setItems((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMovies = data.results.filter((m) => !existingIds.has(m.id));
          return [...prev, ...newMovies];
        });
        setHasMore(pageNum < fetchThreshold && pageNum < data.total_pages);
      } catch {
        setHasMore(false);
      } finally {
        loadingRef.current = false;
      }
    },
    [fetchFn, fetchThreshold],
  );

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadPage(nextPage);
  }, [hasMore, page, loadPage]);

  return { items, hasMore, loadMore };
};
