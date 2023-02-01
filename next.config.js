/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["profile.line-scdn.net", "www.w3schools.com"],
  },
  env: {
    LONGDO_API_KEY: "f433fe86f47e0a432053c1b577ad6aeb",
    NEXT_PUBLIC_LIFF_ID: "1657690669-pJKJnlDb",
    BASE_URL_CLI: "https://api-smart-report-production.up.railway.app",
    BASE_URL_SERV: "https://api-smart-report-production.up.railway.app",
    MONGODB_URI:
      "mongodb+srv://tanthaizababo:Tanthai064@cluster0.cdglj2d.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
