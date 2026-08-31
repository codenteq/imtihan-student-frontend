'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { setTitle } from '@/store/slices/root';
import { AppDispatch, useDispatch } from '@/store';
import {
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    EllipsisVerticalIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Label,
} from '@codenteq/interfeys';
import Link from 'next/link';

export default function FlowPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(setTitle('Akış'));
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <main className="flex gap-5">
                <div className="flex flex-col gap-5 w-full">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Avatar fallback="ASA" />
                                    <Label>Ahmet Sefa Arşiv • 2 sa</Label>
                                </div>

                                <div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={toggleMenu}>
                                        <EllipsisVerticalIcon className="w-6 h-6 dark:text-white" />
                                    </div>
                                    {isOpen && (
                                        <div className="relative">
                                            <ul className="absolute right-0 truncate rounded-lg shadow-md backdrop-blur-lg bg-black/20 dark:bg-white/10">
                                                <li className="mr-2 px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500 cursor-pointer">
                                                    @ahmetarsiv adlı kişiyi
                                                    takip et
                                                </li>
                                                <li className="mr-2 px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500 cursor-pointer">
                                                    @ahmetarsiv'in gönderisini
                                                    bildir
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </CardContent>
                        <CardFooter className="flex justify-start gap-10">
                            <ChatBubbleOvalLeftIcon className="w-5 h-6 cursor-pointer" />
                            <ArrowPathRoundedSquareIcon className="w-5 h-6 cursor-pointer" />
                            <HeartIcon className="w-5 h-6 cursor-pointer" />
                            <BookmarkIcon className="w-5 h-6 cursor-pointer" />
                            <ArrowUpTrayIcon className="w-5 h-6 cursor-pointer" />
                        </CardFooter>
                    </Card>
                </div>

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
