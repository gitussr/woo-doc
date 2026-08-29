import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Static Orama index built from all docs pages.
// https://docs.orama.com/docs/orama-js/supported-languages
export const { GET } = createFromSource(source, {
  language: 'english',
});
