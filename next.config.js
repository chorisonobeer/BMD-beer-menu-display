const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // 開発モードの場合のみキャッシュを設定
    if (dev) {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.next/cache'),
        buildDependencies: {
          config: [__filename]
        }
      }
    }
    return config
  },
  output: 'export'
}

module.exports = nextConfig