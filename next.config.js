/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.xpadev.net',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [300]
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
