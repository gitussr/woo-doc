import type { ReactNode } from 'react';

/* ================================================================== *
 * WooDoc content components — the reusable building blocks that make
 * every page answer the DX questions quickly (What / Where / When /
 * When not / How / Internally / Gotchas / Safer alternative).
 *
 * All components are server components (no client JS). They are
 * registered globally in components/mdx.tsx and available in every
 * `.mdx` file without an import.
 * ================================================================== */

type Priority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';

const PRIORITY_META: Record<Priority, { label: string; hint: string; className: string }> = {
  P0: { label: 'P0 · Essential', hint: 'Cannot understand WooCommerce without this', className: 'bg-fd-primary/15 text-fd-primary ring-fd-primary/30' },
  P1: { label: 'P1 · Core Development', hint: 'Day-to-day WooCommerce development', className: 'bg-violet-500/15 text-violet-600 ring-violet-500/30 dark:text-violet-400' },
  P2: { label: 'P2 · Advanced Development', hint: 'Deeper customization and architecture', className: 'bg-teal-500/15 text-teal-700 ring-teal-500/30 dark:text-teal-300' },
  P3: { label: 'P3 · Specialized', hint: 'Advanced or niche scenarios', className: 'bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300' },
  P4: { label: 'P4 · Reference', hint: 'Deep technical / lookup material', className: 'bg-fd-muted-foreground/15 text-fd-muted-foreground ring-fd-muted-foreground/30' },
};

export function PriorityBadge({ level }: { level: Priority }) {
  const meta = PRIORITY_META[level];
  return (
    <span
      title={meta.hint}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

/**
 * The metadata strip at the top of a documentation page. Lets a
 * developer classify a page in ~2 seconds before reading it.
 */
export function PageMeta({
  priority,
  audience,
  status = 'Draft · Step 1 foundation',
  versions = 'WordPress 7.1 · WooCommerce 11.0.1',
  updated,
}: {
  priority: Priority;
  audience: string;
  status?: string;
  versions?: string;
  updated?: string;
}) {
  return (
    <div className="not-prose my-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-fd-border bg-fd-card/60 px-4 py-3 text-sm">
      <PriorityBadge level={priority} />
      <MetaField label="Audience" value={audience} />
      <MetaField label="Status" value={status} />
      <MetaField label="Applies to" value={versions} />
      {updated ? <MetaField label="Updated" value={updated} /> : null}
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className="text-[11px] font-medium uppercase tracking-wide text-fd-muted-foreground">
        {label}
      </span>
      <span className="text-fd-foreground">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Extension safety — the spine of WooDoc's "just because you can…"
 * principle. Three levels, consistent colors everywhere.
 * ------------------------------------------------------------------ */

type SafetyKind = 'recommended' | 'risky' | 'dangerous';

const SAFETY_META: Record<SafetyKind, { title: string; icon: string; wrap: string; head: string }> = {
  recommended: {
    title: 'Recommended extension point',
    icon: '✓',
    wrap: 'border-[var(--woo-safe)]/30 bg-[var(--woo-safe)]/8',
    head: 'text-[var(--woo-safe)]',
  },
  risky: {
    title: 'Possible, but has maintenance cost',
    icon: '!',
    wrap: 'border-[var(--woo-caution)]/35 bg-[var(--woo-caution)]/10',
    head: 'text-[var(--woo-caution)]',
  },
  dangerous: {
    title: 'Dangerous — avoid',
    icon: '✕',
    wrap: 'border-[var(--woo-danger)]/35 bg-[var(--woo-danger)]/10',
    head: 'text-[var(--woo-danger)]',
  },
};

export function SafetyLevel({
  level,
  title,
  children,
}: {
  level: SafetyKind;
  title?: string;
  children: ReactNode;
}) {
  const meta = SAFETY_META[level];
  return (
    <div className={`not-prose my-4 rounded-xl border px-4 py-3 ${meta.wrap}`}>
      <p className={`mb-1 flex items-center gap-2 text-sm font-semibold ${meta.head}`}>
        <span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs"
        >
          {meta.icon}
        </span>
        {title ?? meta.title}
      </p>
      <div className="space-y-2 text-sm text-fd-foreground/90 [&_a]:underline [&_code]:text-[0.85em] [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-0 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * "Where does this come from?" — WooDoc's signature UX pattern.
 * ------------------------------------------------------------------ */

export function WhereFrom({
  looking,
  origin,
  controls,
  safe,
  avoid,
}: {
  looking: ReactNode;
  origin: ReactNode;
  controls: ReactNode;
  safe: ReactNode;
  avoid: ReactNode;
}) {
  const rows: Array<[string, ReactNode]> = [
    ['What am I looking at?', looking],
    ['Where does it come from?', origin],
    ['What controls it?', controls],
    ['What can I safely modify?', safe],
    ['What should I avoid?', avoid],
  ];
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border">
      <div className="border-b border-fd-border bg-fd-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
        Where does this come from?
      </div>
      <dl className="divide-y divide-fd-border">
        {rows.map(([q, a]) => (
          <div key={q} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
            <dt className="text-sm font-medium text-fd-muted-foreground">{q}</dt>
            <dd className="text-sm text-fd-foreground [&_code]:text-[0.85em] [&_p]:my-0">{a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Version + Classic-vs-Blocks notes — technical accuracy rules.
 * ------------------------------------------------------------------ */

export function VersionNote({ version, children }: { version: string; children: ReactNode }) {
  return (
    <div className="not-prose my-4 rounded-lg border-l-4 border-[var(--woo-info)] bg-[var(--woo-info)]/8 px-4 py-3 text-sm">
      <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-[var(--woo-info)]">
        Version-specific · {version}
      </span>
      <div className="text-fd-foreground/90">{children}</div>
    </div>
  );
}

export function ClassicVsBlocks({ classic, blocks }: { classic: ReactNode; blocks: ReactNode }) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {[
        ['Classic (PHP templates + hooks)', classic],
        ['Blocks (Cart/Checkout Blocks)', blocks],
      ].map(([label, body]) => (
        <div key={label as string} className="rounded-xl border border-fd-border bg-fd-card/60 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
            {label}
          </p>
          <div className="text-sm text-fd-foreground/90 [&_code]:text-[0.85em]">{body}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Marks a concrete claim (hook name, template path, class, behavior)
 * that still needs to be checked against official sources / core code.
 * Per the Step 1 accuracy policy: write from knowledge, flag specifics.
 */
export function VerifyNote({ children }: { children?: ReactNode }) {
  return (
    <span className="not-prose mx-0.5 inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-1.5 py-0.5 align-baseline text-[0.72em] font-medium text-amber-700 ring-1 ring-inset ring-amber-500/30 dark:text-amber-300">
      <span aria-hidden>⚠</span>
      verify{children ? <span className="font-normal opacity-80">— {children}</span> : null}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Flow / lifecycle / layer visualisations — every diagram must
 * answer a developer question, never decoration.
 * ------------------------------------------------------------------ */

export function Lifecycle({
  steps,
  caption,
  direction = 'vertical',
}: {
  steps: string[];
  caption?: string;
  direction?: 'vertical' | 'horizontal';
}) {
  const horizontal = direction === 'horizontal';
  return (
    <figure className="not-prose my-6">
      <ol
        className={
          horizontal
            ? 'flex flex-wrap items-stretch gap-2'
            : 'flex flex-col gap-0'
        }
      >
        {steps.map((step, i) => (
          <li key={step} className={horizontal ? 'flex items-center gap-2' : ''}>
            <span className="flex items-center gap-3">
              <span className="inline-flex min-w-6 items-center justify-center rounded-md bg-fd-primary/12 px-1.5 py-0.5 text-xs font-semibold text-fd-primary">
                {i + 1}
              </span>
              <span className="rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 text-sm text-fd-foreground">
                {step}
              </span>
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className={
                  horizontal
                    ? 'px-1 text-fd-muted-foreground'
                    : 'my-1 ml-[11px] block h-4 w-px bg-fd-border'
                }
              >
                {horizontal ? '→' : ''}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fd-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function LayerStack({
  layers,
  caption,
}: {
  layers: Array<{ name: string; note?: string }>;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-xl border border-fd-border">
        {layers.map((layer, i) => (
          <div
            key={layer.name}
            className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${
              i > 0 ? 'border-t border-fd-border' : ''
            } ${i % 2 ? 'bg-fd-card/40' : 'bg-fd-card/70'}`}
          >
            <span className="text-sm font-semibold text-fd-foreground sm:w-56 sm:shrink-0">
              {layer.name}
            </span>
            {layer.note ? (
              <span className="text-sm text-fd-muted-foreground">{layer.note}</span>
            ) : null}
          </div>
        ))}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fd-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Decision guide — "when to use WooCommerce vs something else", etc.
 * ------------------------------------------------------------------ */

export function DecisionGuide({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 space-y-2 rounded-xl border border-fd-border bg-fd-card/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
        Decision guide
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function Choice({ when, children }: { when: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-1 rounded-lg bg-fd-muted/40 p-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-4">
      <div className="text-sm font-medium text-fd-foreground [&_p]:m-0">
        <span className="text-fd-muted-foreground">If </span>
        {when}
      </div>
      <div className="text-sm text-fd-foreground/90 [&_p]:m-0">{children}</div>
    </div>
  );
}
