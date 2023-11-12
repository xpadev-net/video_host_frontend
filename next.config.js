/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAME,
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [300]
  }
}

module.exports = nextConfig
