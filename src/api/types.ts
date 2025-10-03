export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  likes: number;
  user: {
    name: string;
  };
  views?: number;
  downloads?: number;
}

export interface SearchResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}
