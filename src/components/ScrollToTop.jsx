import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global ScrollToTop Component
 * Fixes Issue 4: Forces scroll position to (0, 0) on every route navigation.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top without lag
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
