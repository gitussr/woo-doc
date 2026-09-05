export interface ToolMeta {
  slug: string;
  title: string;
  oneLiner: string;
  href: string;
  status: 'available' | 'planned';
}

/**
 * Every WooDoc Tool registers itself here. Adding a future tool is an
 * entry in this array plus its own data module and page — not a rewrite
 * of the Tools index or shell.
 */
export const TOOLS: ToolMeta[] = [
  {
    slug: 'template-visualizer',
    title: 'WooCommerce Template Visualizer',
    oneLiner:
      'Click through a WooCommerce page and see exactly which hook, template, and extension mechanism renders each piece.',
    href: '/tools/template-visualizer',
    status: 'available',
  },
  {
    slug: 'hook-explorer',
    title: 'Hook Explorer',
    oneLiner: 'Find the right action or filter for a change you want to make, by area and intent.',
    href: '/tools/hook-explorer',
    status: 'planned',
  },
  {
    slug: 'product-query-builder',
    title: 'Product Query Builder',
    oneLiner: 'Visually construct a product query and see the generated, explained PHP.',
    href: '/tools/product-query-builder',
    status: 'planned',
  },
];
