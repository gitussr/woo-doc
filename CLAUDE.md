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
  Orama search at `/api/search` — exported as a static index (`staticGET` +
  `search.options.type: 'static'` in `app/layout.tsx`) so it works both
  normally and under a static export.
- Content lives in `content/docs/**.mdx`; ordering in `meta.json` per folder.
- **Deployment:** GitHub Pages, classic branch source (not Actions — the gh
  CLI token here lacks the `workflow` scope needed to push
  `.github/workflows/*`). `npm run deploy:pages`
  (`scripts/deploy-gh-pages.sh`) builds with `GITHUB_PAGES=true` (→
  `output: 'export'`, `basePath: '/woo-doc'` in `next.config.mjs`), syncs
  `out/` into a `gh-pages` branch via a worktree at
  `.git/gh-pages-worktree`, and pushes it — GitHub Pages serves that branch
  directly. **Deploys are not automatic on push to `main`**; re-run the
  script whenever `main` should go live. Live at
  `https://gitussr.github.io/woo-doc/`. Local dev/build/start are
  unaffected — `GITHUB_PAGES` is unset there, so no basePath and a normal
  Next.js server.

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

## WooDoc Tools

A parallel track alongside the content phases below: interactive developer
utilities embedded in the site (`/tools`), not MDX content. Architecture:

- `lib/tools/types.ts` — shared `TemplateNode`/`ToolContext` shapes a tool's
  data module is built from.
- `lib/tools/registry.ts` — the `TOOLS` array driving the `/tools` index
  card grid. Adding a future tool is an entry here plus its own data module
  and page, not a rewrite.
- `components/tools/tool-shell.tsx` — `ToolShell`/`ToolSection`, the
  reusable Title → Configuration → Result → Why → Code → Warnings → Related
  page shape every tool uses.
- `components/tools/node-detail.tsx` — renders Why/Code/Warnings/Related for
  one node by **reusing** `WhereFrom`/`SafetyLevel`/`VerifyNote` from
  `components/woodoc.tsx` rather than inventing new visual language for
  tools. The same accuracy policy below applies here: an unverified claim in
  tool data gets a `verify` field, rendered as `<VerifyNote>`.
- Pages live under `app/(home)/tools/**` (inherits `HomeLayout` for free —
  do not add a tools-specific layout or route them through the docs
  `source`/`loader`).

**First tool — WooCommerce Template Visualizer** (`/tools/template-visualizer`,
`components/tools/template-visualizer.tsx` +
`lib/tools/template-visualizer-data.ts`): pick a WooCommerce page context,
click through its component tree, see the hook/priority/template/filter
that renders each piece and the recommended extension mechanism. Ships one
context (Single Product), seeded from verified WooCommerce 11.0.1 core
source (`wc-template-hooks.php` / `wc-template-functions.php`). Two claims
are still `verify`-flagged: the `woocommerce_sale_flash` filter signature,
and the exact add-to-cart template/hook chain for grouped/variable/external
product types (only "simple" is verified). `/tools` lists two more contexts
as `status: 'planned'` (Hook Explorer, Product Query Builder) — data only,
not built.

Full architecture spec: `Downloads/WooDoc — Interactive Developer Tools
Architecture Prompt.md` (the user's brief). Roadmap beyond the Template
Visualizer, per that brief: a Cart context for this same tool (needs its own
hook/template verification pass — the repo's existing Cart content covers
totals/session internals, not the cart page's hook map), then Hook Explorer,
Query Builder, and the lifecycle visualizers, each its own increment.

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

Phase 6 (Customization, debugging, operations) is **content-complete and
through its accuracy pass**: four flat pages at
`content/docs/customization.mdx`, `debugging.mdx`, `performance.mdx`,
`security.mdx` (matching the flat, non-grouped shape these four have in the
IA tree — unlike Commerce Lifecycle / Data & Storage, they are not a
folder), wired into root `meta.json` after `data-storage`. IA "How this maps
to the current site" updated. Each page is written as the *applied*
companion to material Development/Foundations/Lifecycle/Data & Storage
already document in depth — it links out rather than repeating mechanics
(e.g. hook-tracing lives on `development/hooks.mdx`, cart-fragment cost on
`development/javascript.mdx`, nonce mechanics on `development/ajax.mdx`) —
per the IA's "does not belong here" notes for each section. All 5
`VerifyNote` tags resolved against WooCommerce 11.0.1 core source /
developer docs (Sept 2026): `woocommerce_product_options_general_product_data`
+ `woocommerce_process_product_meta` confirmed current, `WC_Log_Handler_File`
5 MB size-based rotation (10 historical files, `delete_logs_before_timestamp()`
for manual age-based cleanup), Store API `Cart-Token` as an HS256 JWT
(`JsonWebToken`, `wp_salt()`-derived secret, `exp` = issue + `DAY_IN_SECONDS *
2`, filterable via `wc_session_expiration`), `WC_Install::create_roles()`
Shop Manager capability set (no HPOS-specific capability — storage mode is a
feature flag, not role-gated), and `WC_Privacy`'s `register_erasers_exporters()`
on `init` with its four exporter/eraser ids. No open `VerifyNote` tags
remain outside `about/design-system.mdx`.

Next: Phase 7 (honesty and depth — Limitations, advanced topics, diagram
pass) — see roadmap. Separately, on the Tools track: an accuracy pass on the
Template Visualizer's 2 remaining `verify` flags, then the Cart context (see
"WooDoc Tools" above).

Remaining `VerifyNote` tags elsewhere: `about/design-system.mdx` only, as
intentional component demos.
