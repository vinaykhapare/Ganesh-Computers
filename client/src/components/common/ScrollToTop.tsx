import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls the window to the top (0, 0) whenever the route
 * (pathname or search query) changes, ensuring every new page view begins
 * from the very top immediately and consistently across all desktop and mobile devices.
 * 
 * Also handles in-page hash anchors (e.g. #section) smoothly if present.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  // Disable browser automatic scroll restoration so it doesn't remember previous scroll positions
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      // If there is an anchor hash, wait a tick for DOM rendering then scroll smoothly
      const elementId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => clearTimeout(timer);
    }

    // Immediately and reliably reset viewport scroll position to (0, 0)
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    } catch {
      window.scrollTo(0, 0);
    }

    // Direct DOM fallback for cross-browser & mobile viewport engines
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
};
