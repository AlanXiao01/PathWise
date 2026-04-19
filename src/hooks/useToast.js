import { useEffect, useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = (msg, type = 'ok') => setToast({ msg, type });

  return { toast, showToast };
}
