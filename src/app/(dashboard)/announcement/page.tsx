'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { ReactNode, useEffect, useState } from 'react';
import { getAnnouncements } from '@/store/slices/announcement';
import ViewModal from '@/app/(dashboard)/announcement/_forms/ViewModal';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import { IAnnouncementResponse } from '@/types/IAnnouncement';
import { setTitle } from '@/store/slices/root';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@codenteq/interfeys';
import Image from 'next/image';
import createImageUrl from '@/lib/image';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function AnnouncementPage(): ReactNode {
    const { announcements, isLoading } = useSelector(
        state => state.announcement,
    );
    const dispatch: AppDispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(setTitle('Duyurular'));
        dispatch(getAnnouncements());
    }, [dispatch]);

    const handleView = (id: number) => {
        setOpenViewModal(true);
        setId(id);
    };

    return (
        <>
            <main>
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
                    ) : announcements.length > 0 ? (
                        announcements.map(
                            (
                                announcement: IAnnouncementResponse,
                                key: number,
                            ) => (
                                <Card className="announcement-card" key={key}>
                                    <Image
                                        className="rounded-t-lg object-cover"
                                        src={createImageUrl(announcement?.src)}
                                        width={640}
                                        height={280}
                                        alt={announcement?.name}
                                    />
                                    <CardHeader>
                                        <CardTitle>
                                            {announcement?.name.slice(0, 35)}
                                        </CardTitle>
                                        <CardDescription>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: announcement?.content
                                                        ? announcement.content.slice(
                                                              0,
                                                              50,
                                                          )
                                                        : '',
                                                }}
                                            />
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button
                                            id="view"
                                            className="w-full"
                                            onClick={() =>
                                                handleView(announcement?.id)
                                            }>
                                            Daha fazla
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ),
                        )
                    ) : (
                        <Card className="col-span-full flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                            <CardHeader className="order-last lg:order-first">
                                <CardTitle>
                                    Henüz görülecek bir şey yok.
                                </CardTitle>
                                <CardDescription>
                                    Şu anda sistemde yayınlanmış bir duyuru
                                    bulunmamaktadır.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-72">
                                    <LottieAnimation animationData={Lottie} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <ViewModal
                        open={openViewModal}
                        setIsOpen={setOpenViewModal}
                        id={id}
                    />
                </div>
            </main>
        </>
    );
}
