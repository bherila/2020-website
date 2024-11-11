// @ts-check
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants'

export default (phase: any) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return {
    assetPrefix: isDev ? undefined : 'https://cf.bherila.net',
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
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
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https://cf.bherila.net; font-src 'self' https://cf.bherila.net;",
            },
          ],
        },
      ];
    },
  }
}
