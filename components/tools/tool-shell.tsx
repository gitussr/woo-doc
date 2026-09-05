import type { ReactNode } from 'react';

/**
 * The reusable page shape every WooDoc Tool is built from: Title →
 * Configuration → Result → Why This → Code → Warnings → Related. A new
 * tool composes ToolShell + ToolSection; it does not need new page
 * scaffolding.
 */
export function ToolShell({
  title,
  tagline,
  children,
}: {
  title: string;
  tagline: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground">{title}</h1>
      <p className="mt-2 max-w-2xl text-fd-muted-foreground">{tagline}</p>
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

export function ToolSection({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
        {eyebrow}
      </h2>
      {children}
    </section>
  );
}
