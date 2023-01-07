/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains: ['profile.line-scdn.net',"www.w3schools.com"],
  },
  env: {
    LONGDO_API_KEY : 'f433fe86f47e0a432053c1b577ad6aeb',
    NEXT_PUBLIC_LIFF_ID: '1657690669-pJKJnlDb',
    // MONGODB_URI : 'mongodb+srv://tanthaizababo:Tanthai064@clusternext.zzg64q1.mongodb.net/?retryWrites=true&w=majority'
    MONGODB_URI : 'mongodb://localhost:27017/smart-report-db'
  },
}

module.exports = nextConfig
