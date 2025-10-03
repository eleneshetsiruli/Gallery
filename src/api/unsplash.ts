import axios from "axios";
import type { Photo, SearchResponse } from "./types";

const UNSPLASH_BASE = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const api = axios.create({
  baseURL: UNSPLASH_BASE,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export async function fetchPhotos(page = 1, perPage = 20): Promise<Photo[]> {
  const res = await api.get<Photo[]>("/photos", {
    params: { page, per_page: perPage, order_by: "popular" },
  });
  return res.data;
}

export async function searchPhotos(
  query: string,
  page = 1,
  perPage = 12
): Promise<Photo[]> {
  const res = await api.get<SearchResponse>("/search/photos", {
    params: { query, page, per_page: perPage },
  });
  return res.data.results;
}

export async function getPhotoById(id: string): Promise<Photo> {
  const res = await api.get<Photo>(`/photos/${id}`);
  return res.data;
}
