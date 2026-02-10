/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com", "13.232.203.138", "blog.eazyvisas.com"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/dummy-flight/visa-ads',
        destination: '/book-flight-hotel-dummy-ticket-for-visa',
        permanent: true,
      },
      {
        source: '/dummy-flight/visa-ads/bookings',
        destination: '/book-flight-hotel-dummy-ticket-for-visa/bookings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
