import { useEffect, useState, type RefObject } from "react";
import type { Photo } from "../api/types";
import { searchPhotos, fetchPhotos } from "../api/unsplash";

export function useSearchResults(
  term: string,
  cache: RefObject<{ [key: string]: Photo[] }>
) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function load() {
      if (!term && page > 1) {
        setHasMore(false);
        return;
      }

      setLoading(true);
      try {
        let results: Photo[] = [];

        if (!term) {
          results = await fetchPhotos(page, 20);
        } else if (page === 1 && cache.current[term]) {
          setPhotos(cache.current[term]);
          setLoading(false);
          return;
        } else {
          results = await searchPhotos(term, page);
        }

        if (results.length === 0) {
          setHasMore(false);
          return;
        }

        setPhotos((prev) => (page === 1 ? results : [...prev, ...results]));
        cache.current[term || "default"] =
          page === 1
            ? results
            : [...(cache.current[term || "default"] || []), ...results];
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [term, page, cache]);

  return { photos, loading, hasMore, page, setPage, setPhotos };
}
