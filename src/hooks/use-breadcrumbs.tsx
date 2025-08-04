
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';


export function useBreadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbs = useMemo(() => {
    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments?.slice(0, index + 1)?.join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
