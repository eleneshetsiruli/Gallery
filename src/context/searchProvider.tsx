import { useRef, useState } from "react";
import { SearchContext } from "./SearchContext";
import type { Photo } from "../api/types";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);
  const cache = useRef<{ [key: string]: Photo[] }>({});

  const addHistory = (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    setHistory((prev) => {
      const filtered = prev.filter(
        (t) => t.toLowerCase() !== cleanTerm.toLowerCase()
      );
      return [cleanTerm, ...filtered];
    });
  };

  return (
    <SearchContext.Provider value={{ history, cache, addHistory }}>
      {children}
    </SearchContext.Provider>
  );
}
