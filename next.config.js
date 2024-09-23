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
  redirects: async () => [
    {
      source: '/wedding',
      destination:
        'https://bherilanet.sharepoint.com/%3Af%3A/s/BethanyBrian/Eh9ELBJHHNhHvN4vyKBPrkIB5jfESBu-L5ySuphnDdvu4w',
      permanent: true,
    },
    {
      source: '/cpanel',
      destination: 'https://web1.dal.cloudplatform.net:2083/',
      permanent: false,
    },
  ],
}

module.exports = nextConfig
