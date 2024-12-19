/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    distDir: 'out',
    trailingSlash: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : ''
  }
  
  module.exports = nextConfig