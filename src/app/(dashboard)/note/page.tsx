'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteNote, getNotes } from '@/store/slices/note';
import Lottie from '../../../../public/lottie/animation_llpiacni.json';
import { INoteResponse } from '@/types/INote';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@codenteq/interfeys';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function NotePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { notes, isLoading } = useSelector(state => state.note);

    useEffect(() => {
        dispatch(setTitle('Notlar'));
        dispatch(getNotes());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (confirm('Emin misiniz?')) {
            dispatch(deleteNote(id));
        }
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Link href={'/note/create'} id="create">
                            <Button className="w-full">Oluştur</Button>
                        </Link>
                        <Link href={'/note/flow'}>
                            <Button className="w-full">Akış</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-1">
                    {isLoading ? (
                        <div
                            role="status"
                            className="w-full p-4 rounded animate-pulse">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-72 mb-2.5" />
                                    <div className="w-40 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 mb-2.5" />
                                    <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-56" />
                                </div>
                            </div>
                        </div>
                    ) : notes.length > 0 ? (
                        notes.map((note: INoteResponse, key: number) => (
                            <Card className="note-card" key={key}>
                                <div className="relative">
                                    <Image
                                        className="rounded-t-lg object-cover"
                                        src={
                                            'https://via.placeholder.com/640x360.png/0c6ba8?text=imtihan'
                                        }
                                        width={640}
                                        height={280}
                                        alt={note?.name}
                                    />
                                    <div className="absolute inset-2">
                                        <Badge>
                                            {note?.is_everyone == true
                                                ? 'Herkes'
                                                : 'Gizli'}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>
                                        <Link
                                            id="view"
                                            key={key}
                                            href={
                                                '/note/' + note?.id + '/view'
                                            }>
                                            <Button
                                                className="!p-0"
                                                variant="link">
                                                {note?.name.slice(0, 35)}
                                            </Button>
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: note?.content
                                                    ? note.content.slice(0, 50)
                                                    : '',
                                            }}
                                        />
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex gap-2">
                                    <Link
                                        id="edit"
                                        className="w-full"
                                        href={'/note/' + note?.id + '/edit'}>
                                        <Button className="w-full">
                                            Düzenle
                                        </Button>
                                    </Link>
                                    <Button
                                        id="remove"
                                        variant="destructive"
                                        size="icon"
                                        className="rounded-lg"
                                        onClick={() => handleDelete(note?.id)}>
                                        <TrashIcon className="w-5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <Card className="col-span-full flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                            <CardHeader className="order-last lg:order-first">
                                <CardTitle>
                                    Hadi ilk notunuzu oluşturalım.
                                </CardTitle>
                                <CardDescription>
                                    Sınırsız defter, notlarınızı alın ve
                                    arkadaşlarınız ile paylaşın.
                                    <Link href={'/note/create'}>
                                        <Button className="w-full lg:max-w-xs mt-4">
                                            Not Oluştur
                                        </Button>
                                    </Link>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-72">
                                    <LottieAnimation animationData={Lottie} />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}
