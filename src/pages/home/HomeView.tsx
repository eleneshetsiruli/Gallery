import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { PhotoCard } from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";
import "./homeStyles.css";
import { useSearchContext } from "../../context/useSearchContext";
import { useSearchResults } from "../../hooks/useSearchResults";

export default function HomeView() {
  const [query, setQuery] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { cache, addHistory } = useSearchContext();

  const { photos, loading, hasMore, page, setPage } = useSearchResults(
    query,
    cache
  );

  useEffect(() => {
    if (query && page === 1) {
      addHistory(query);
    }
  }, [query, page, addHistory]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, setPage]);

  return (
    <div className="home-view">
      <header className="app-header">
        <NavLink to="/">HOME</NavLink>
        <NavLink onClick={() => setQuery("")} to="/history">
          HISTORY
        </NavLink>
        <input
          className="search-input"
          type="text"
          placeholder="Search photo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <div className="photos-list">
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => setSelectedPhotoId(photo.id)}>
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      {selectedPhotoId && (
        <PhotoModal
          photoId={selectedPhotoId}
          onClose={() => setSelectedPhotoId(null)}
        />
      )}

      {loading && <p>Loading...</p>}
      {!hasMore && !loading && query && <p>No more photos</p>}
      {query && <div ref={loaderRef} style={{ height: "20px" }} />}
    </div>
  );
}
