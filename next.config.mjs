/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingIncludes: {
    '/resume': ['./cv.tex'],
    '/api/resume': ['./cv.tex'],
  },
};

export default nextConfig;
