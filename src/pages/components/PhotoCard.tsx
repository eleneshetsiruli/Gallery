import type { Photo } from "../../api/types";

interface PhotoCardProps {
  photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="photo-card">
      <img
        src={photo.urls.regular}
        alt={photo.user.name}
        className="photo-img"
      />
      <p className="photo-info">{photo.user.name}</p>
    </div>
  );
}
