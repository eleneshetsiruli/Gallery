import { useEffect, useState } from "react";
import { getPhotoById } from "../../api/unsplash";
import type { Photo } from "../../api/types";
import "./modalStyle.css";

interface PhotoModalProps {
  photoId: string | null;
  onClose: () => void;
}

export default function PhotoModal({ photoId, onClose }: PhotoModalProps) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!photoId) return;
    setLoading(true);
    getPhotoById(photoId)
      .then((data) => setPhoto(data))
      .finally(() => setLoading(false));
  }, [photoId]);

  if (!photoId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading && <p>Loading...</p>}
        {photo && (
          <>
            <img
              src={photo.urls.full}
              alt={photo.user.name}
              className="modal-image"
            />
            <div className="photo-info">
              <p>
                <strong>Photographer:</strong> {photo.user.name}
              </p>
              <p>❤️ Likes: {photo.likes}</p>
              <p>👀 Views: {photo.views}</p>
              <p>⬇️ Downloads: {photo.downloads}</p>
            </div>
            <button className="close-btn" onClick={onClose}>
              ✖ Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
