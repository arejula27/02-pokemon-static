/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    //estos dominios seran catalogados como seguros para leer imagenes
    domains:['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
