import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  output: 'standalone',
};

export default nextConfig;
