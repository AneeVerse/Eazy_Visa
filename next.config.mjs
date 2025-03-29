/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["source.unsplash.com", "images.unsplash.com"],
      },
    async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
