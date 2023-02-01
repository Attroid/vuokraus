/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com'],
  },
  i18n: {
    locales: ['fi'],
    defaultLocale: 'fi',
  },
};

module.exports = nextConfig;
