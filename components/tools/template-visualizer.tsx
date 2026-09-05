'use client';

import { useMemo, useState } from 'react';
import { ToolShell, ToolSection } from '@/components/tools/tool-shell';
import { ContextSelector, NodeTree } from '@/components/tools/context-tree';
import { NodeDetail } from '@/components/tools/node-detail';
import { TEMPLATE_VISUALIZER_CONTEXTS } from '@/lib/tools/template-visualizer-data';
import type { TemplateNode } from '@/lib/tools/types';

function findNode(nodes: TemplateNode[], id: string): TemplateNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export function TemplateVisualizer() {
  const [contextId, setContextId] = useState<string | null>(null);
  const [nodeId, setNodeId] = useState<string | null>(null);

  const context = useMemo(
    () => TEMPLATE_VISUALIZER_CONTEXTS.find((c) => c.id === contextId) ?? null,
    [contextId],
  );
  const node = useMemo(
    () => (context ? findNode(context.nodes, nodeId ?? '') : undefined),
    [context, nodeId],
  );

  return (
    <ToolShell
      title="WooCommerce Template Visualizer"
      tagline="Select a WooCommerce page, then click a piece of it to see exactly which hook, template, and extension mechanism renders it."
    >
      <ToolSection eyebrow="Configuration">
        <ContextSelector
          contexts={TEMPLATE_VISUALIZER_CONTEXTS}
          selectedId={contextId}
          onSelect={(id) => {
            setContextId(id);
            setNodeId(null);
          }}
        />
      </ToolSection>

      <ToolSection eyebrow="Result">
        {context ? (
          <NodeTree nodes={context.nodes} selectedId={nodeId} onSelect={setNodeId} />
        ) : (
          <p className="text-sm text-fd-muted-foreground">
            Select a context above to see its component tree.
          </p>
        )}
      </ToolSection>

      {context && !node ? (
        <p className="text-sm text-fd-muted-foreground">
          Click a node in the tree to see how it works.
        </p>
      ) : null}

      {node ? <NodeDetail node={node} /> : null}
    </ToolShell>
  );
}
