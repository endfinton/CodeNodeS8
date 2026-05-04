/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portfolio',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
