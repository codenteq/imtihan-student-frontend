'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@codenteq/interfeys';
import Muin from '../../../../public/lottie/Animation - 1712519369192.json';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function MuinPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        dispatch(setTitle('Muin'));
    }, [dispatch]);

    return (
        <>
            <main className="flex gap-5">
                <Card className="flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                    <CardHeader className="order-last lg:order-first">
                        <CardTitle>Merhaba ben Muin</CardTitle>
                        <CardDescription>
                            Sana yardım etmek için buradayım. En kısa sürede
                            tanışacağız!
                            <Popover>
                                <PopoverTrigger onClick={togglePopover}>
                                    <Button className="w-full lg:max-w-xs mt-4">
                                        Daha fazla
                                    </Button>
                                </PopoverTrigger>
                                {isOpen && (
                                    <div className="relative">
                                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 lg:left-auto lg:transform-none lg:mt-0 lg:ml-4">
                                            <PopoverContent>
                                                <h2>Muin Zeki Yardımcın</h2>
                                                <p className="my-5">
                                                    Yapay zeka ile
                                                    güçlendirilmiş bir öğrenme
                                                    arkadaşı.
                                                </p>
                                                <ul className="my-5">
                                                    <li>Sorularınızı Sorun</li>
                                                    <li>Anında Çözüm Alın</li>
                                                    <li>
                                                        Kişiselleştirilmiş
                                                        İmtihan Deneyimi
                                                    </li>
                                                    <li>
                                                        Performans Analizi ve
                                                        İyileştirme
                                                    </li>
                                                </ul>
                                                <p className="my-5">
                                                    Muin ile tanışın ve eğitim
                                                    hayatınıza bir adım önde
                                                    başlayın. İmtihanlar artık
                                                    daha kolay ve keyifli!
                                                    Başarılar dileriz.
                                                </p>
                                                <Link
                                                    href={
                                                        'https://imtihantech.com/muin'
                                                    }
                                                    target="_blank">
                                                    <Button>Daha fazla</Button>
                                                </Link>
                                            </PopoverContent>
                                        </div>
                                    </div>
                                )}
                            </Popover>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72">
                            <LottieAnimation animationData={Muin} />
                        </div>
                    </CardContent>
                </Card>

                <aside className="bg-white dark:bg-black sm:hidden md:hidden lg:block xl:block 2xl:block hidden w-2/5 my-4">
                    <div className="flex flex-col gap-2">
                        <h3>Premium'a Abone Ol</h3>
                        <span>
                            Yeni özellikleri açmak için abone ol ve uygun olman
                            durumunda reklam geliri payı kazan.
                        </span>
                        <Link href={'/plan'}>
                            <Button className="w-full">Abone ol</Button>
                        </Link>
                    </div>
                </aside>
            </main>
        </>
    );
}
