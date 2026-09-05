# WooDoc — working notes for Claude

WooDoc is a **developer-first WooCommerce engineering reference** built
incrementally. Read `content/docs/about/project-definition.mdx` and
`content/docs/about/roadmap.mdx` before doing substantive work — they are the
source of truth for scope and sequencing.

## What this project is / is not

- IS: a reference that builds a mental model — trace each topic to the layer
  that owns it, label customizations by safety level, note the downstream
  ripple, call out version and classic-vs-Blocks differences.
- IS NOT: a snippet/recipe blog. Never optimize for page count.

## Build / run

- `npm run dev` / `npm run build` / `npm run start`
- Next.js 16 App Router, React 19, Tailwind 4, Fumadocs (UI + core + mdx),
  Orama search at `/api/search`.
- Content lives in `content/docs/**.mdx`; ordering in `meta.json` per folder.

## Content conventions

- Start every page with `<PageMeta priority=... audience=... />`.
- Prefer the flow: **Concept → Location → Decision → Implementation → Warning
  → Example → Related**. Not every page needs every section.
- Use the WooDoc components (registered globally in `components/mdx.tsx`,
  defined in `components/woodoc.tsx`): `PageMeta`, `PriorityBadge`,
  `SafetyLevel`, `WhereFrom`, `VersionNote`, `VerifyNote`, `ClassicVsBlocks`,
  `Lifecycle`, `LayerStack`, `DecisionGuide`, `Choice`. Full gallery:
  `/docs/about/design-system`.
- Diagrams (`Lifecycle`, `LayerStack`) must answer a developer question — no
  decoration.

## Accuracy policy (important)

- Do NOT invent hooks, template paths, classes, functions, or behavior.
- Conceptual content may be written from knowledge.
- Every concrete API-level claim not yet verified against official docs or
  WooCommerce core source MUST be tagged inline: `<VerifyNote>what to
  check</VerifyNote>`.
- Each roadmap phase ends with an accuracy pass that clears the `VerifyNote`
  tags it introduced.
- Target versions: WordPress 7.1, WooCommerce 11.0.1 (see
  `lib/layout.shared.tsx` → `WOODOC_TARGET`).

## Theming

- WooDoc identity tokens and Fumadocs variable overrides are in
  `app/global.css`. The color theme follows the Laravel Nightwatch docs
  palette (per user request): near-black bg `#0a0b0d`, hairline borders
  `#27292c`, off-white headings `#e0e2e6`, grey body `#a0a2a6`, single blue
  accent `#3b82f6`, code surface `#0b0c0e`. Semantic accent vars:
  `--woo-safe`, `--woo-caution`, `--woo-danger`, `--woo-info`.
- Palette only — keep WooDoc's own name, logo mark, copy, and components.

## Next likely task

Phases 2 (Foundations) and 3 (Development toolkit) are content-complete and
through their accuracy passes.

Phase 4 (Commerce Lifecycle) is **content-complete and through its accuracy
pass**: `content/docs/lifecycle/` has `products`, `cart`, `checkout`,
`orders`, `payments`, `shipping-and-tax`, `emails`, grouped under a "Commerce
Lifecycle" folder and wired into root `meta.json` after `development`. IA tree
+ section reference updated. `VerifyNote` tags resolved against WooCommerce
11.0.1 core source (Sept 2026): `WC_Cart_Totals` + `generate_cart_id`,
`wc_get_order_statuses` list + `wc-checkout-draft` + custom-status
registration, `wc_maybe_reduce/increase_stock_levels` hooks + `ReserveStock` +
`woocommerce_hold_stock_minutes`, `wc_create_refund` keys + refund hooks,
`WC_Tax::calc_tax` + rounding option + tax tables + `woocommerce_tax_based_on`,
shipping package/rate filters + classic-vs-Block selection, `WC_Payment_*` +
`wc-api` webhook mechanism + token tables, Blocks payment method
(`registerPaymentMethod` / `AbstractPaymentMethodType`), email class ids +
`*_notification` trigger mechanism + content hook params, Block email editor
(Advanced → Features), `woocommerce_scheduled_sales`, `woocommerce_product_class`,
`woocommerce_register_additional_checkout_field`. No open `VerifyNote` tags
remain in `content/docs/lifecycle/`.

Phase 5 (Data and Storage) is **content-complete and through its accuracy
pass**: `content/docs/data-storage/` has `database` (P2 concept), `hpos` (P1
concept), `schema-reference` (P4 full column listing), grouped under a "Data &
Storage" folder and wired into root `meta.json` after `lifecycle`. IA tree +
section reference updated. Table/column data was pulled directly from
`WC_Install::get_schema()` and the HPOS column-mapping constants in 11.0.1
core source. The last open `VerifyNote` (HPOS migration controller/CLI and
legacy-row retention) was resolved against WooCommerce developer docs +
core source: migration/sync run internally via
`Automattic\WooCommerce\Internal\DataStores\Orders\DataSynchronizer` +
`PostsToOrdersMigrationController`, exposed as WP-CLI commands through
`CLIRunner` under `wp wc hpos` (`sync`, `backfill`, `cleanup`); legacy
`wp_posts`/`wp_postmeta` rows are **not** deleted automatically — `wp wc hpos
cleanup` is a separate explicit step, and even then a `shop_order_placehold`
placeholder post is kept per order. No open `VerifyNote` tags remain in
`content/docs/data-storage/`.

Phase 6 (Customization, debugging, operations) content is **drafted**: four
flat pages at `content/docs/customization.mdx`, `debugging.mdx`,
`performance.mdx`, `security.mdx` (matching the flat, non-grouped shape these
four have in the IA tree — unlike Commerce Lifecycle / Data & Storage, they
are not a folder), wired into root `meta.json` after `data-storage`. IA
"How this maps to the current site" updated. Each page is written as the
*applied* companion to material Development/Foundations/Lifecycle/Data &
Storage already document in depth — it links out rather than repeating
mechanics (e.g. hook-tracing lives on `development/hooks.mdx`, cart-fragment
cost on `development/javascript.mdx`, nonce mechanics on
`development/ajax.mdx`) — per the IA's "does not belong here" notes for each
section. 5 `VerifyNote` tags remain, one or two per page: the current
simple-product admin-field hook pair (`customization.mdx`), `WC_Log_Handler_File`
rotation/retention behavior (`debugging.mdx`), the Store API `Cart-Token`
format/expiry (`performance.mdx`), and the current Shop-Manager capability
list plus `WC_Privacy` eraser/exporter hook names (`security.mdx`).

Next: finish the Phase 6 accuracy pass (resolve those 5 `VerifyNote` tags
against WooCommerce 11.0.1 core source / developer docs), then Phase 7
(honesty and depth — Limitations, advanced topics, diagram pass) — see
roadmap.

Remaining `VerifyNote` tags elsewhere: `about/design-system.mdx` only, as
intentional component demos.
