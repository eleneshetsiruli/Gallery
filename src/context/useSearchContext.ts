import { useContext } from "react";
import { SearchContext, type SearchContextType } from "./SearchContext";

export function useSearchContext(): SearchContextType {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be inside SearchProvider");
  return ctx;
}
