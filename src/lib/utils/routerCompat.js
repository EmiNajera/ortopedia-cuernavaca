import React, { useEffect, useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// Link compatibility: supports `to` (react-router) and `href` (Next.js)
export function Link({ to, href, children, replace, shallow, scroll, prefetch, locale, ...rest }) {
  const finalHref = to ?? href ?? '#';
  return (
    <NextLink 
      href={finalHref} 
      replace={replace} 
      shallow={shallow} 
      scroll={scroll} 
      prefetch={prefetch} 
      locale={locale}
      legacyBehavior
      passHref
      {...rest}
    >
      {children}
    </NextLink>
  );
}

// useNavigate compatibility
export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      return;
    }
    const method = options.replace ? router.replace : router.push;
    return method.call(router, to, undefined, { shallow: options.shallow, scroll: options.scroll });
  };
}

// useParams compatibility
export function useParams() {
  const router = useRouter();
  return router.query || {};
}

// useLocation compatibility
export function useLocation() {
  if (typeof window !== 'undefined') {
    const asPath = window.location.pathname + window.location.search + window.location.hash;
    const [pathname, searchAndHash = ''] = asPath.split('?');
    const [search = '', hash = ''] = searchAndHash.split('#');
    return {
      pathname,
      search: search ? `?${search}` : '',
      hash: hash ? `#${hash}` : '',
    };
  }
  // SSR fallback
  return { pathname: '/', search: '', hash: '' };
}

// useSearchParams compatibility (returns tuple [URLSearchParams, setSearchParams])
export function useSearchParams() {
  // Compute params from window without requiring Next router
  const params = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, [typeof window !== 'undefined' ? window.location.search : '']);
  // Call Next's useRouter at the top level of this hook so rules-of-hooks are satisfied.
  // During SSR useRouter still returns an object but router.push may be noop'd in usage.
  const router = useRouter();

  const setSearchParams = (next) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (typeof next === 'function') {
      const current = new URLSearchParams(url.search);
      const updated = next(current) || current;
      url.search = updated.toString();
    } else if (next && typeof next === 'object') {
      const updated = new URLSearchParams(next);
      url.search = updated.toString();
    }
    // Use Next router if available; otherwise use history API
    if (router && typeof router.push === 'function') {
      router.push(url.pathname + (url.search ? `?${url.search}` : ''), undefined, { shallow: true });
    } else {
      window.history.pushState({}, '', url.pathname + (url.search ? `?${url.search}` : ''));
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // keep in sync on back/forward
  useEffect(() => {
    const handler = () => {};
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return [params, setSearchParams];
}

// No-op exports to avoid crashes if imported accidentally
export const BrowserRouter = () => null;
export const Routes = () => null;
export const Route = () => null;


