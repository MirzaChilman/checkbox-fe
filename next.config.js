/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/6.x/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/mirza-chilman/",
        permanent: true,
      },
      {
        source: "/github/mirzachilman",
        destination: "https://github.com/MirzaChilman",
        permanent: true,
      },
      {
        source: "/github/mirza-garin",
        destination: "https://github.com/mirza-garin",
        permanent: true,
      },
      {
        source: "/gitlab/mirzachilman",
        destination: "https://gitlab.com/mirzachilman",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
