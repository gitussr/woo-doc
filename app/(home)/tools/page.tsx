import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools/registry';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Interactive WooCommerce developer tools embedded in WooDoc.',
};

export default function ToolsIndexPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-fd-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-semibold tracking-tight">WooDoc Tools</h1>
          <p className="mt-4 max-w-2xl text-lg text-fd-muted-foreground">
            Interactive utilities that let you see and decide, not just read — click through
            WooCommerce&rsquo;s architecture instead of only reading about it.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) =>
              tool.status === 'available' ? (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="group rounded-xl border border-fd-border bg-fd-card/50 p-5 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent/50"
                >
                  <h3 className="font-medium text-fd-foreground group-hover:text-fd-primary">
                    {tool.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">{tool.oneLiner}</p>
                </Link>
              ) : (
                <div
                  key={tool.slug}
                  className="rounded-xl border border-dashed border-fd-border p-5 opacity-60"
                >
                  <h3 className="font-medium text-fd-foreground">{tool.title}</h3>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">{tool.oneLiner}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
                    Coming soon
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
