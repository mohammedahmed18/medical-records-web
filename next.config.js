/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  swcMinify: true,

  images: {
    domains: ['res.cloudinary.com'],
  },

  // SVGR
  webpack(config, { isServer }) {
    config.resolve.modules.push(__dirname + '/public');
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });
    if (isServer) {
      config.resolve.alias['~'] = __dirname + '/public';
    }
    return config;
  },
};

module.exports = nextConfig;
