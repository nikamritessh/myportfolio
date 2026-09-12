/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingExcludes: {
    '*': [
      '.pnpm-store/**',
      '**/.pnpm-store/**',
    ],
  },
};

export default nextConfig;
