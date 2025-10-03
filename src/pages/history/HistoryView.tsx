import { NavLink } from "react-router-dom";
import { useSearchContext } from "../../context/useSearchContext";
import { useState } from "react";
import { PhotoCard } from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useSearchResults } from "../../hooks/useSearchResults";

export default function HistoryView() {
  const { history, cache } = useSearchContext();
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const { photos, loading, hasMore, setPage, setPhotos } = useSearchResults(
    selectedTerm,
    cache
  );

  const loaderRef = useInfiniteScroll(
    () => setPage((prev) => prev + 1),
    !!selectedTerm && hasMore && !loading
  );

  return (
    <div className="history-view">
      <header>
        <NavLink to="/"> ⇠ Home </NavLink>
      </header>
      <h1>Search History</h1>

      <ul className="history-list">
        {history.length === 0 && <li>No search history yet.</li>}
        {history.map((term) => (
          <li key={term}>
            <button
              className={`history-btn ${selectedTerm === term ? "active" : ""}`}
              onClick={() => {
                setSelectedTerm(term);
                setPhotos([]);
                setPage(1);
              }}
            >
              {term}
            </button>
          </li>
        ))}
      </ul>

      {selectedTerm && (
        <div className="photos-list">
          <h2>Results for: {selectedTerm}</h2>
          {photos.map((photo) => (
            <div key={photo.id} onClick={() => setSelectedPhotoId(photo.id)}>
              <PhotoCard photo={photo} />
            </div>
          ))}
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more photos</p>}
          <div ref={loaderRef} style={{ height: "20px" }} />
        </div>
      )}

      <PhotoModal
        photoId={selectedPhotoId}
        onClose={() => setSelectedPhotoId(null)}
      />
    </div>
  );
}
