export const nextConfig = {};
export default {
  async rewrites() {
    return [];
    // return [
    //   {
    //     source: "/api/:path*",
    //     destination: "https://localhost:3000/api", // Proxy to your backend server
    //   },
    // ];
  },
};
