import { ReactNode } from 'react';
import { Metadata } from 'next';
import GuestLayout from '@/layouts/GuestLayout';

export const metadata: Metadata = {
    title: 'Bekleme Listesi',
};

export default function VerifyEmailLayout(props: { children: ReactNode }) {
    return <GuestLayout>{props.children}</GuestLayout>;
}