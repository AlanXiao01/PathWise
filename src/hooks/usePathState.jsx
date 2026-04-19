import { useCallback, useState } from 'react';

export function usePathState(initial = 'home') {
  const [page, setPage] = useState(initial);
  const [stack, setStack] = useState([initial]);

  const navigate = useCallback((next) => {
    setPage(next);
    setStack((prev) => [...prev, next]);
  }, []);

  const resetNav = useCallback((next) => {
    setPage(next);
    setStack([next]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setPage(next[next.length - 1]);
      return next;
    });
  }, []);

  return { page, stack, navigate, resetNav, goBack };
}
