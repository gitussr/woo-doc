import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// Exported at build time (staticGET) so search works identically under
// `output: 'export'` (GitHub Pages) and normal builds — the client
// downloads this index once and searches it locally. See app/layout.tsx
// for the matching static search client config.
// https://docs.orama.com/docs/orama-js/supported-languages
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
});
