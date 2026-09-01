require('dotenv').config();

const BACKEND_URL =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000';

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
                destination: `${BACKEND_URL}/sanctum/:path*`,
            },
            {
                source: '/api/:path*',
                destination: `${BACKEND_URL}/api/:path*`,
            },
            {
                source: '/login',
                destination: `${BACKEND_URL}/login`,
            },
            {
                source: '/logout',
                destination: `${BACKEND_URL}/logout`,
            },
            {
                source: '/register',
                destination: `${BACKEND_URL}/register`,
            },
            {
                source: '/forgot-password',
                destination: `${BACKEND_URL}/forgot-password`,
            },
            {
                source: '/reset-password',
                destination: `${BACKEND_URL}/reset-password`,
            },
            {
                source: '/email/:path*',
                destination: `${BACKEND_URL}/email/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;

