import type { ToolContext } from './types';

/**
 * WooCommerce 11.0.1 core source (wc-template-hooks.php /
 * wc-template-functions.php) for hook names and priorities. Two claims not
 * yet checked against core carry a `verify` note and render <VerifyNote>,
 * per WooDoc's accuracy policy — see CLAUDE.md.
 */
const SINGLE_PRODUCT_CONTEXT: ToolContext = {
  id: 'single-product',
  label: 'Single Product',
  description: 'The product detail page, rendered from templates/single-product.php.',
  nodes: [
    {
      id: 'sale-badge',
      label: 'Sale Badge',
      description: 'The "Sale!" flash shown on discounted products.',
      hook: { name: 'woocommerce_before_single_product_summary', type: 'action', priority: 10 },
      recommendedMechanism: 'filter',
      filterName: 'woocommerce_sale_flash',
      codeExample: `add_filter( 'woocommerce_sale_flash', function ( $html, $post, $product ) {
    return '<span class="onsale">Deal!</span>';
}, 10, 3 );`,
      verify: 'confirm the woocommerce_sale_flash filter signature is still current in 11.0.1',
      docHref: '/docs/foundations/extension-model',
    },
    {
      id: 'product-images',
      label: 'Product Images',
      description: 'The main image and thumbnail gallery.',
      hook: { name: 'woocommerce_before_single_product_summary', type: 'action', priority: 20 },
      recommendedMechanism: 'action',
      codeExample: `remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
// add your own gallery callback at priority 20 instead`,
      docHref: '/docs/foundations/extension-model',
      children: [
        {
          id: 'product-thumbnails',
          label: 'Product Thumbnails',
          description: 'The strip of secondary gallery images under the main image.',
          hook: { name: 'woocommerce_product_thumbnails', type: 'action', priority: 20 },
          recommendedMechanism: 'action',
          codeExample: `add_action( 'woocommerce_product_thumbnails', 'my_extra_thumbnail', 25 );`,
          docHref: '/docs/foundations/extension-model',
        },
      ],
    },
    {
      id: 'product-summary',
      label: 'Product Summary',
      description: 'The column of title, rating, price, description, and add-to-cart next to the images.',
      hook: { name: 'woocommerce_single_product_summary', type: 'action' },
      recommendedMechanism: 'action',
      codeExample: `add_action( 'woocommerce_single_product_summary', 'my_custom_summary_row', 25 );

function my_custom_summary_row() {
    echo '<p>Between price (10) and short description (20).</p>';
}`,
      docHref: '/docs/foundations/extension-model',
      children: [
        {
          id: 'title',
          label: 'Title',
          description: 'The product name, rendered as an <h1>.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 5 },
          templatePath: 'single-product/title.php',
          recommendedMechanism: 'template-override',
          codeExample: `// yourtheme/woocommerce/single-product/title.php`,
          docHref: '/docs/development/templates',
        },
        {
          id: 'rating',
          label: 'Rating',
          description: 'The star rating and review count.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 10 },
          templatePath: 'single-product/rating.php',
          recommendedMechanism: 'template-override',
          codeExample: `// yourtheme/woocommerce/single-product/rating.php`,
          docHref: '/docs/development/templates',
        },
        {
          id: 'price',
          label: 'Price',
          description: 'The formatted regular/sale price.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 10 },
          templatePath: 'single-product/price.php',
          recommendedMechanism: 'filter',
          filterName: 'woocommerce_get_price_html',
          codeExample: `add_filter( 'woocommerce_get_price_html', function ( $price, $product ) {
    return $price . ' <small>(tax incl.)</small>';
}, 10, 2 );`,
          warning: {
            level: 'recommended',
            text: 'Prefer this filter over overriding price.php — it changes the price HTML everywhere it is shown (catalog, cart, emails), not just on this one template.',
          },
          docHref: '/docs/foundations/extension-model',
        },
        {
          id: 'short-description',
          label: 'Short Description',
          description: 'The excerpt shown above the meta line.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 20 },
          templatePath: 'single-product/short-description.php',
          recommendedMechanism: 'template-override',
          codeExample: `// yourtheme/woocommerce/single-product/short-description.php`,
          docHref: '/docs/development/templates',
        },
        {
          id: 'add-to-cart',
          label: 'Add to Cart',
          description: 'The quantity input and Add to Cart button.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 30 },
          recommendedMechanism: 'action',
          codeExample: `add_action( 'woocommerce_simple_add_to_cart', 'woocommerce_simple_add_to_cart' ); // core default for simple products`,
          warning: {
            level: 'risky',
            text: 'This callback does not call wc_get_template() itself — it fires a per-product-type action (woocommerce_simple_add_to_cart for simple products; other types follow the same woocommerce_{type}_add_to_cart pattern). There is no single template to override here.',
          },
          verify: 'confirm the exact add-to-cart template/hook chain for grouped, variable, and external product types',
          docHref: '/docs/lifecycle/products',
        },
        {
          id: 'meta',
          label: 'Meta',
          description: 'The SKU, categories, and tags line.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 40 },
          templatePath: 'single-product/meta.php',
          recommendedMechanism: 'template-override',
          codeExample: `// yourtheme/woocommerce/single-product/meta.php`,
          docHref: '/docs/development/templates',
        },
        {
          id: 'sharing',
          label: 'Sharing',
          description: 'Social sharing buttons, if enabled.',
          hook: { name: 'woocommerce_single_product_summary', type: 'action', priority: 50 },
          templatePath: 'single-product/share.php',
          recommendedMechanism: 'template-override',
          codeExample: `// yourtheme/woocommerce/single-product/share.php`,
          docHref: '/docs/development/templates',
        },
      ],
    },
    {
      id: 'product-tabs',
      label: 'Product Tabs',
      description: 'The Description / Additional information / Reviews tabs.',
      hook: { name: 'woocommerce_after_single_product_summary', type: 'action', priority: 10 },
      recommendedMechanism: 'filter',
      filterName: 'woocommerce_product_tabs',
      codeExample: `add_filter( 'woocommerce_product_tabs', function ( $tabs ) {
    unset( $tabs['reviews'] );
    return $tabs;
} );`,
      warning: {
        level: 'recommended',
        text: 'Add, remove, or reorder tabs through the woocommerce_product_tabs filter, not by overriding a template — the tabs region is one filtered array, not a per-tab template.',
      },
      docHref: '/docs/foundations/extension-model',
    },
    {
      id: 'upsells',
      label: 'Upsell Products',
      description: 'The "You may also like" row.',
      hook: { name: 'woocommerce_after_single_product_summary', type: 'action', priority: 15 },
      recommendedMechanism: 'action',
      codeExample: `remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );`,
      docHref: '/docs/foundations/extension-model',
    },
    {
      id: 'related-products',
      label: 'Related Products',
      description: 'The related-products grid at the bottom of the page.',
      hook: { name: 'woocommerce_after_single_product_summary', type: 'action', priority: 20 },
      templatePath: 'single-product/related.php',
      recommendedMechanism: 'template-override',
      codeExample: `// yourtheme/woocommerce/single-product/related.php`,
      docHref: '/docs/development/templates',
    },
  ],
};

export const TEMPLATE_VISUALIZER_CONTEXTS: ToolContext[] = [SINGLE_PRODUCT_CONTEXT];
