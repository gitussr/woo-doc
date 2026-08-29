import Link from 'next/link';

const QUESTION_LADDER = [
  'What am I looking at?',
  'Where does it come from?',
  'Which WooCommerce layer controls it?',
  'Template, hook, filter, JS event, AJAX, block, shortcode, or PHP?',
  'What is the safest place to change it?',
  'What are the consequences of changing it there?',
];

const ENTRY_POINTS = [
  {
    href: '/docs',
    title: 'Start Here',
    body: 'What WooDoc is, who it is for, and the path from WordPress developer to confident WooCommerce engineer.',
  },
  {
    href: '/docs/introduction/why-woocommerce',
    title: 'Why WooCommerce?',
    body: 'What problem it solves, what it adds to WordPress, the trade-offs, and when another stack is the better call.',
  },
  {
    href: '/docs/introduction/developer-mental-model',
    title: 'Developer Mental Model',
    body: 'Why building a store is not building a brochure site — and the dimensions you now have to think in.',
  },
  {
    href: '/docs/about/information-architecture',
    title: 'Information Architecture',
    body: 'The full documentation map: every planned section, its purpose, audience, and priority.',
  },
  {
    href: '/docs/about/design-system',
    title: 'Documentation Design System',
    body: 'The reusable page patterns and content components every WooDoc page is built from.',
  },
  {
    href: '/docs/about/roadmap',
    title: 'Roadmap',
    body: 'How WooDoc grows from this foundation across the coming phases.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="border-b border-fd-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-fd-primary" />
            Step 1 · Documentation foundation
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Understand WooCommerce deeply enough that it stops feeling like a
            black box.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fd-muted-foreground">
            WooDoc is a developer-first WooCommerce engineering reference. It
            connects the pieces — WordPress, core, templates, hooks, filters,
            JavaScript, AJAX, REST, blocks, and the database — so you can find
            the right extension point and know what your change will affect.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Start Here
            </Link>
            <Link
              href="/docs/introduction/why-woocommerce"
              className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            >
              Why WooCommerce?
            </Link>
          </div>
        </div>
      </section>

      {/* Question ladder */}
      <section className="border-b border-fd-border bg-fd-card/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fd-muted-foreground">
            WooDoc teaches a different question
          </h2>
          <p className="mt-2 max-w-2xl text-fd-foreground">
            Not <span className="text-fd-muted-foreground">“how do I change this button?”</span>{' '}
            but a chain of questions that leads to a safe, maintainable change:
          </p>
          <ol className="mt-6 space-y-2">
            {QUESTION_LADDER.map((q, i) => (
              <li key={q} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-fd-primary/12 text-xs font-semibold text-fd-primary">
                  {i + 1}
                </span>
                <span className="text-fd-foreground">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Entry points */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fd-muted-foreground">
            In this first release
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRY_POINTS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-fd-border bg-fd-card/50 p-5 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent/50"
              >
                <h3 className="font-medium text-fd-foreground group-hover:text-fd-primary">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm text-fd-muted-foreground">{card.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-fd-muted-foreground">
          WooDoc · documents WordPress 7.1 · WooCommerce 11.0.1 · built
          incrementally.
        </div>
      </footer>
    </main>
  );
}
