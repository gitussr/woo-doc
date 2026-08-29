import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      // "Start Here" is the docs entry point.
      { source: '/start-here', destination: '/docs', permanent: false },
    ];
  },
};

export default withMDX(config);
