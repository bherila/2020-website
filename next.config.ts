// @ts-check
import type { NextConfig } from 'next'

export default (_phase: string): NextConfig => {
  return {
    output: 'standalone',
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
      {
        source: '/subscribe/smb',
        destination: 'https://checkout.square.site/merchant/5170N93FK2SE4/checkout/3GQ3ACLAURLKM7FAUGNP7NEC',
        permanent: false,
      },
      {
        source: '/primerib25',
        destination:
          'https://bherilanet-my.sharepoint.com/:x:/g/personal/ben_herila_net/Ee3J5a3QS8hJq2w7976yr4YB5A-4oYAd3NqxBNuiwXL1Zg?e=JFVZwc',
        permanent: false,
      },
      {
        source: '/ucplugin',
        destination: 'https://uc-plugin.vercel.app/',
        permanent: false,
      },
      {
        source: '/ucplugin/:path*',
        destination: 'https://uc-plugin.vercel.app/:path*',
        permanent: false,
      },
      {
        source: '/ucadmin-prod/:path*',
        destination: 'https://uc-plugin.vercel.app/:path*',
        permanent: false,
      },
      {
        source: '/ucadmin-dev/:path*',
        destination: 'https://uc-plugin-benh-ben-herilas-projects.vercel.app/:path*',
        permanent: false,
      },
    ],
  }
}
