import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import GuestLayout from '@/layouts/GuestLayout';

export const metadata: Metadata = {
    title: 'Parola Sıfırlama - İmtihan',
    description: 'İmtihan, yüzlerce eğitim materyaline erişim sağlayan dijital bir eğitim platformudur.',
    metadataBase: new URL('https://open.imtihantech.com'),
    openGraph: {
        title: 'Parola Sıfırlama - İmtihan',
        description: 'İmtihan, yüzlerce eğitim materyaline erişim sağlayan dijital bir eğitim platformudur.',
        type: 'website',
        url: 'https://open.imtihantech.com',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'İmtihan'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        site: '@imtihan_tr',
        title: 'Parola Sıfırlama - İmtihan',
        description: 'İmtihan, yüzlerce eğitim materyaline erişim sağlayan dijital bir eğitim platformudur.',
        images: '/og-image.png'
    }
};

export default function PasswordResetLayout(props: { children: ReactNode }) {
    return (
        <GuestLayout>
            <Suspense>{props.children}</Suspense>
        </GuestLayout>
    );
}
