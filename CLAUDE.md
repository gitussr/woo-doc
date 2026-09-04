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

Phase 2 (Foundations) is content-complete and through its accuracy pass.

Phase 3 (Development toolkit) is **content-complete and through its accuracy
pass**: `content/docs/development/` has `hooks`, `filters`, `templates`,
`shortcodes`, `blocks`, `ajax`, `rest-api`, `javascript`, wired into root
`meta.json` after `foundations`. All `VerifyNote` tags resolved against
WooCommerce 11.0.1 core source and developer docs (Sept 2026): `WC_AJAX`
event list + single `wc_ajax_` hook, frontend script handles + localized
params, `checkout.js` JS events, `WC_Shortcodes` registrations +
`woocommerce_shortcode_products_query`, `wc_get_template` signature, Store API
endpoint list + `Cart-Token`/`Nonce` headers, `ExtendSchema` helper shapes,
Blocks Slot/Fill names + scope, `WC_Deprecated_*_Hooks`.

Next: Phase 4 (commerce lifecycle) — see roadmap.

Remaining `VerifyNote` tags elsewhere: `about/design-system.mdx` only, as
intentional component demos.
