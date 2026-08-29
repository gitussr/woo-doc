import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-woodoc-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-woodoc-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'WooDoc — A developer-first WooCommerce engineering reference',
    template: '%s · WooDoc',
  },
  description:
    'WooDoc helps WordPress developers understand WooCommerce deeply — where functionality comes from, which layer controls it, the safest place to extend it, and the consequences of changing it.',
  applicationName: 'WooDoc',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
