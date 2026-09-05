'use client';

import type { TemplateNode, ToolContext } from '@/lib/tools/types';

export function ContextSelector({
  contexts,
  selectedId,
  onSelect,
}: {
  contexts: ToolContext[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {contexts.map((context) => (
        <button
          key={context.id}
          type="button"
          onClick={() => onSelect(context.id)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            selectedId === context.id
              ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
              : 'border-fd-border bg-fd-card text-fd-foreground hover:bg-fd-accent'
          }`}
        >
          {context.label}
        </button>
      ))}
    </div>
  );
}

function NodeRow({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: TemplateNode;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
        className={`flex w-full items-center justify-between gap-3 rounded-md py-2 pr-3 text-left text-sm transition-colors ${
          selectedId === node.id
            ? 'bg-fd-primary/10 text-fd-primary'
            : 'text-fd-foreground hover:bg-fd-accent'
        }`}
      >
        <span>{node.label}</span>
        {node.hook?.priority !== undefined ? (
          <span className="shrink-0 rounded bg-fd-muted px-1.5 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
            @{node.hook.priority}
          </span>
        ) : null}
      </button>
      {node.children ? (
        <ul>
          {node.children.map((child) => (
            <NodeRow key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function NodeTree({
  nodes,
  selectedId,
  onSelect,
}: {
  nodes: TemplateNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="overflow-hidden rounded-xl border border-fd-border">
      {nodes.map((node) => (
        <NodeRow key={node.id} node={node} depth={0} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </ul>
  );
}
