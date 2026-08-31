'use client';

import React, { ReactNode } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@codenteq/interfeys';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Step3Props {
    onPrev: () => void;
    onFinish: () => void;
}

export default function Step3({ onPrev, onFinish }: Step3Props): ReactNode {
    return (
        <form onSubmit={onFinish}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Fiyatlandırma
            </h3>

            <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 max-w-3xl">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Freemium</CardTitle>
                        <CardDescription className="flex flex-col justify-center items-baseline">
                            Teklif döneminden sonra ayda
                            <span className="text-xl font-bold">
                                0,00 TL
                                <span className="text-base">
                                    /1 ay ücretsiz
                                </span>
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul role="list" className="space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Çevrimiçi sınav oluşturma</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Kaynaklar ve öğrenme materyalleri</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Not alma ve düzenleme</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3.5">
                        <Link
                            href="https://open.imtihantech.com/auth/register"
                            className="w-full">
                            <Button className="uppercase w-full">Üye Ol</Button>
                        </Link>

                        <p className="text-zinc-500 dark:text-zinc-400 text-xs text-left mt-3.5">
                            <Link href="/terms-of-services">
                                <span className="underline">
                                    Hüküm ve koşullar geçerlidir.{' '}
                                </span>
                            </Link>
                            {
                                "Premium'u daha önce denemiş olan kullanıcılar 1 aylık ücretsiz tekliften yararlanamaz."
                            }
                        </p>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Premium</CardTitle>
                        <CardDescription className="flex flex-col justify-center items-baseline">
                            Teklif döneminden sonra ayda
                            <span className="text-xl font-bold">
                                69,99 TL
                                <span className="text-base">
                                    /1 ay ücretsiz
                                </span>
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul role="list" className="space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Özel sınav oluşturma</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>İlerleme takibi</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Kişisel eğitim koçu (AI)</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                                <span>Google takvimler senkronizasyonu</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3.5">
                        <Link
                            href="https://open.imtihantech.com/auth/register"
                            className="w-full">
                            <Button className="uppercase w-full">Üye Ol</Button>
                        </Link>

                        <p className="text-zinc-500 dark:text-zinc-400 text-xs text-left mt-3.5">
                            <Link href="/terms-of-services">
                                <span className="underline">
                                    Hüküm ve koşullar geçerlidir.{' '}
                                </span>
                            </Link>
                            {
                                "Premium'u daha önce denemiş olan kullanıcılar 1 aylık ücretsiz tekliften yararlanamaz."
                            }
                        </p>
                    </CardFooter>
                </Card>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Button onClick={onPrev} variant="destructive">
                    Önceki
                </Button>
                <Button type="submit">Tamamla</Button>
            </div>
        </form>
    );
}
