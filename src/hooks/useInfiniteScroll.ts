import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, canLoad: boolean) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canLoad || !loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [canLoad, callback]);

  return loaderRef;
}
