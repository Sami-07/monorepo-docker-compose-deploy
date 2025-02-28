/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static page generation for pages that need dynamic data
  output: 'standalone',
  // Enable static optimization where possible
  experimental: {
    // Enable streaming features
    serverActions: true,
  }
};

export default nextConfig;
