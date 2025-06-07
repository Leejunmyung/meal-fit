declare module 'next-pwa' {
  import { NextConfig } from 'next'

  type PWAOptions = {
    dest: string
    disable?: boolean
    register?: boolean
    skipWaiting?: boolean
    buildExcludes?: string[]
    fallbacks?: {
      image?: string
      document?: string
      font?: string
    }
    [key: string]: any
  }

  function withPWA(pwaOptions: PWAOptions): (nextConfig: NextConfig) => NextConfig

  export default withPWA
}