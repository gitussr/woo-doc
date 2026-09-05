/**
 * Shared data shapes for the WooDoc Tools ecosystem. A new tool adds a data
 * module using these types (or its own, if the shape genuinely differs) —
 * not a new UI system.
 */

export type ExtensionMechanism = 'action' | 'filter' | 'template-override' | 'none';

/** Matches SafetyLevel's level prop shape (components/woodoc.tsx) structurally. */
export type WarningLevel = 'recommended' | 'risky' | 'dangerous';

export interface TemplateNode {
  id: string;
  label: string;
  /** "What am I looking at?" — one line. */
  description: string;
  /**
   * The hook this node's markup comes from. Omit `priority` when the node
   * itself IS the container hook (e.g. "Product Summary" is
   * woocommerce_single_product_summary) rather than one of the callbacks
   * hooked into it.
   */
  hook?: {
    name: string;
    type: 'action' | 'filter';
    priority?: number;
  };
  /** Template file this node renders, if any, e.g. 'single-product/price.php'. */
  templatePath?: string;
  /** The filter to reach for instead of a template override, if there is one. */
  filterName?: string;
  recommendedMechanism: ExtensionMechanism;
  codeExample: string;
  warning?: {
    level: WarningLevel;
    text: string;
  };
  /** Set when a claim here hasn't been checked against core source yet — renders <VerifyNote>. */
  verify?: string;
  docHref: string;
  children?: TemplateNode[];
}

export interface ToolContext {
  id: string;
  label: string;
  description: string;
  nodes: TemplateNode[];
}
