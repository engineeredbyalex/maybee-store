const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maybee-nextjs-ecommerce.s3.amazonaws.com',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'maybee-nextjs-ecommerce.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/*',
      }
    ],
  },
}
module.exports = nextConfig