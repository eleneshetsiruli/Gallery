import { createContext, type RefObject } from "react";
import type { Photo } from "../api/types";

export type SearchContextType = {
  history: string[];
  cache: RefObject<{ [key: string]: Photo[] }>;
  addHistory: (term: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
