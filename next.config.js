/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // 静的エクスポート用
    images: {
      unoptimized: true  // 静的エクスポートのため
    },
    // 他の設定があればここに追加
  }
  
  module.exports = nextConfig