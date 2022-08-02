import { useEffect, useState } from "react";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.scrollHeight - 5
    ) {
      setPage((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return page;
}
