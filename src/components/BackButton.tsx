'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    const handleGoBack = (): void => {
        router.back();
    };

    return (
        <>
            <button
                onClick={handleGoBack}
                className="fixed flex justify-center items-center top-2 left-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-20">
                <ArrowLeftIcon className="w-6 h-6 z-10 dark:text-white" />
            </button>
        </>
    );
}
