import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  PageMeta,
  PriorityBadge,
  SafetyLevel,
  WhereFrom,
  VersionNote,
  ClassicVsBlocks,
  VerifyNote,
  Lifecycle,
  LayerStack,
  DecisionGuide,
  Choice,
} from '@/components/woodoc';

/**
 * Global MDX components. Anything registered here is usable in every
 * `.mdx` file with no import — this is WooDoc's content design system.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    PageMeta,
    PriorityBadge,
    SafetyLevel,
    WhereFrom,
    VersionNote,
    ClassicVsBlocks,
    VerifyNote,
    Lifecycle,
    LayerStack,
    DecisionGuide,
    Choice,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
