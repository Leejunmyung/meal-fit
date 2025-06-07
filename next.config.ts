import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, // ⛔ 개발 환경에서는 PWA 비활성화
})(nextConfig)