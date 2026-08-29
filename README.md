# WooDoc

A **developer-first WooCommerce documentation and engineering reference**.

> Give developers enough understanding and visibility into WooCommerce that it
> stops feeling like a black box.

WooDoc is not another "how to use WooCommerce" tutorial. It is a reference for
WordPress developers who need to understand WooCommerce deeply enough to build,
customize, extend, and debug it with confidence — knowing *where* functionality
comes from, *which layer* controls it, the *safest* place to change it, and the
*consequences* of that change.

## Status — Step 1: Documentation Foundation

This release establishes the foundation only. It intentionally does **not**
document every hook, template, class, setting, or table yet.

Shipped in Step 1:

| Deliverable | Location |
| --- | --- |
| Project definition | `/docs/about/project-definition` |
| Information architecture | `/docs/about/information-architecture` |
| Start Here | `/docs` |
| Chapter 1 — Why WooCommerce? | `/docs/introduction/why-woocommerce` |
| Developer Mental Model | `/docs/introduction/developer-mental-model` |
| Where Does This Come From? | `/docs/introduction/where-does-this-come-from` |
| Documentation design system | `/docs/about/design-system` |
| Future roadmap | `/docs/about/roadmap` |

See the [Roadmap](./content/docs/about/roadmap.mdx) for later phases.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **Fumadocs** (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`) — content
  pipeline, docs layout, navigation
- **Tailwind CSS 4**
- **Orama** static search index (`/api/search`)
- Deployable to **Vercel**

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project layout

```
app/
  (home)/            marketing landing page + home layout
  docs/              docs layout + [[...slug]] catch-all page
  api/search/        Orama search route
  global.css         Tailwind + Fumadocs + WooDoc theme tokens
content/docs/        all documentation (.mdx) + meta.json ordering
components/
  woodoc.tsx         WooDoc content components (the design system)
  mdx.tsx            global MDX component registry
lib/
  source.ts          Fumadocs content source
  layout.shared.tsx  shared nav config + version target
```

## Authoring content

Every `.mdx` page can use these components with no import (see the full gallery
at `/docs/about/design-system`):

`PageMeta`, `PriorityBadge`, `SafetyLevel`, `WhereFrom`, `VersionNote`,
`VerifyNote`, `ClassicVsBlocks`, `Lifecycle`, `LayerStack`, `DecisionGuide`,
`Choice` — plus the standard Fumadocs `Callout`, `Cards`/`Card`, `Tabs`,
`Steps`, `Accordion`.

**Accuracy policy:** conceptual content is written from knowledge; every
concrete hook name, template path, class, or version-specific behavior that is
not yet source-verified is tagged inline with `<VerifyNote>…</VerifyNote>` and
cleared in a later accuracy pass.

## Version context

WooDoc currently documents against **WordPress 7.1** and
**WooCommerce 11.0.1**. Version-specific behavior is called out explicitly.
