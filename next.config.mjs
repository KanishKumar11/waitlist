/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "ALLOW_ALL",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
