'use client';

import React, { ReactNode, useEffect } from 'react';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@codenteq/interfeys';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function NotificationPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Bildirimler'));
    }, [dispatch]);
    return (
        <>
            <main>
                <Card className="flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                    <CardHeader className="order-last lg:order-first">
                        <CardTitle>Henüz görülecek bir şey yok.</CardTitle>
                        <CardDescription>
                            Şu anda sistemde yayınlanmış bir bildirim
                            bulunmamaktadır.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72">
                            <LottieAnimation animationData={Lottie} />
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
