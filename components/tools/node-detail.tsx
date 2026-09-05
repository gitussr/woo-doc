'use client';

import { useState } from 'react';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { WhereFrom, SafetyLevel, VerifyNote } from '@/components/woodoc';
import type { TemplateNode } from '@/lib/tools/types';

const MECHANISM_LABEL: Record<TemplateNode['recommendedMechanism'], string> = {
  action: 'Hook an action',
  filter: 'Hook a filter',
  'template-override': 'Override the template',
  none: 'No extension point',
};

function originText(node: TemplateNode) {
  if (!node.hook) return 'Not tied to a specific hook.';
  const { name, priority } = node.hook;
  if (priority === undefined) {
    return (
      <>
        This node <strong>is</strong> the <code>{name}</code> action itself — everything below it
        in the tree is a callback hooked into it.
      </>
    );
  }
  return (
    <>
      A callback hooked onto <code>{name}</code> at priority <code>{priority}</code>.
    </>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="rounded-md border border-fd-border bg-fd-card px-2 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function NodeDetail({ node }: { node: TemplateNode }) {
  return (
    <div className="space-y-6">
      <WhereFrom
        looking={<>{node.label} — {node.description}</>}
        origin={originText(node)}
        controls={
          <>
            {MECHANISM_LABEL[node.recommendedMechanism]}
            {node.filterName ? <> — <code>{node.filterName}</code></> : null}
            {node.templatePath ? <> — <code>{node.templatePath}</code></> : null}
          </>
        }
        safe={<>{MECHANISM_LABEL[node.recommendedMechanism]}, as shown in the code below.</>}
        avoid={
          node.templatePath && node.recommendedMechanism !== 'template-override' ? (
            <>Overriding <code>{node.templatePath}</code> when the filter above already reaches this value.</>
          ) : (
            <>Editing WooCommerce core files directly, or relying on undocumented internals.</>
          )
        }
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
            Code
          </h3>
          <CopyButton text={node.codeExample} />
        </div>
        <pre className="overflow-x-auto rounded-lg border border-fd-border p-4 text-sm">
          <code>{node.codeExample}</code>
        </pre>
      </div>

      {node.warning ? (
        <SafetyLevel level={node.warning.level}>{node.warning.text}</SafetyLevel>
      ) : null}

      {node.verify ? <VerifyNote>{node.verify}</VerifyNote> : null}

      <Cards>
        <Card title="Extension Model" href="/docs/foundations/extension-model" description="The four mechanisms this tool maps every node to." />
        <Card title="Templates" href="/docs/development/templates" description="The override mechanism, in depth." />
        {node.docHref !== '/docs/foundations/extension-model' && node.docHref !== '/docs/development/templates' ? (
          <Card title="Related documentation" href={node.docHref} description="Deeper coverage of this specific piece." />
        ) : null}
      </Cards>
    </div>
  );
}
