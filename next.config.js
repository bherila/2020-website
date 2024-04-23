/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    serverActions: true,
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  redirects: [
    {
      source: '/wedding',
      destination:
        'https://bherilanet.sharepoint.com/:f:/s/BethanyBrian/Eh9ELBJHHNhHvN4vyKBPrkIB5jfESBu-L5ySuphnDdvu4w',
      permanent: true,
    },
  ],
}

module.exports = nextConfig
