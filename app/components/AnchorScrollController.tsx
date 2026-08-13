'use client';

import { useEffect } from 'react';

const LAYOUT_READY_CLASS = 'anchor-layout-ready';

function getHashTarget(hash: string): HTMLElement | null {
  if (!hash || hash === '#') return null;

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function waitForStableLayout(callback: FrameRequestCallback): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

export default function AnchorScrollController() {
  useEffect(() => {
    const scrollToHash = (
      hash: string,
      behavior: ScrollBehavior = 'auto',
      updateHistory = false,
    ): void => {
      const target = getHashTarget(hash);
      if (!target) return;

      // Off-screen sections use content-visibility for a faster first paint.
      // Reveal their real dimensions before calculating the anchor position.
      document.documentElement.classList.add(LAYOUT_READY_CLASS);

      waitForStableLayout(() => {
        if (updateHistory && window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }

        target.scrollIntoView({ behavior, block: 'start' });
      });
    };

    const onClick = (event: MouseEvent): void => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        !destination.hash ||
        !getHashTarget(destination.hash)
      ) {
        return;
      }

      event.preventDefault();
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      scrollToHash(destination.hash, behavior, true);
    };

    const onHistoryNavigation = () => {
      scrollToHash(window.location.hash);
    };

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onHistoryNavigation);

    // Correct native anchor navigation after a route load/hydration as well.
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onHistoryNavigation);
    };
  }, []);

  return null;
}
