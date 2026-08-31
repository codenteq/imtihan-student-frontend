require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    i18n: {
        locales: ['tr'],
        defaultLocale: 'tr',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/sanctum/:path*',
                destination: 'http://imtihan-backend.test/sanctum/:path*',
            },
            {
                source: '/api/:path*',
                destination: 'http://imtihan-backend.test/api/:path*',
            },
            {
                source: '/login',
                destination: 'http://imtihan-backend.test/login',
            },
            {
                source: '/logout',
                destination: 'http://imtihan-backend.test/logout',
            },
            {
                source: '/register',
                destination: 'http://imtihan-backend.test/register',
            },
            {
                source: '/forgot-password',
                destination: 'http://imtihan-backend.test/forgot-password',
            },
            {
                source: '/reset-password',
                destination: 'http://imtihan-backend.test/reset-password',
            },
            {
                source: '/email/:path*',
                destination: 'http://imtihan-backend.test/email/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
