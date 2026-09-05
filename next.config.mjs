import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// Set by the GitHub Pages deploy workflow. Local dev/build/start stay a
// normal Next.js server with no basePath; only the Pages export needs one,
// since it's served from https://<user>.github.io/woo-doc/ rather than /.
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/woo-doc' : '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  basePath,
  env: {
    // Read by the search client to locate the exported index under a
    // basePath — see app/layout.tsx.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages ? { output: 'export', images: { unoptimized: true } } : {}),
};

export default withMDX(config);
