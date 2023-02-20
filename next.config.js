/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  i18n: {
    locales: ['fi'],
    defaultLocale: 'fi',
  },
};

module.exports = nextConfig;
