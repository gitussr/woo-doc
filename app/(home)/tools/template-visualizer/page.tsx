import type { Metadata } from 'next';
import { TemplateVisualizer } from '@/components/tools/template-visualizer';

export const metadata: Metadata = {
  title: 'WooCommerce Template Visualizer',
  description:
    'Click through a WooCommerce page and see exactly which hook, template, and extension mechanism renders each piece.',
};

export default function TemplateVisualizerPage() {
  return <TemplateVisualizer />;
}
