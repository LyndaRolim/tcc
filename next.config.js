/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_URL: process.env.DB_URL
  }
}

module.exports = nextConfig
