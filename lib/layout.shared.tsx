import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout options (nav bar, links) used by both the home layout
 * and the docs layout.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="inline-block h-4 w-4 rounded-[5px] bg-fd-primary"
          />
          WooDoc
        </span>
      ),
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Tools',
        url: '/tools',
        active: 'nested-url',
      },
    ],
  };
}

/** Version context WooDoc currently documents against. */
export const WOODOC_TARGET = {
  wordpress: '7.1',
  woocommerce: '11.0.1',
} as const;
