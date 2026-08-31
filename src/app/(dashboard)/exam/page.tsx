'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import Image from 'next/image';
import { getExamTypes } from '@/store/slices/exam-type';
import { IExamTypeResponse } from '@/types/IExamType';
import { createExam } from '@/store/slices/exam';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
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
import Lottie from '../../../../public/lottie/animation_llpjjjsc.json';
import CreateCustomExamModal from '@/app/(dashboard)/exam/_modal/CreateCustomExam';
import createImageUrl from '@/lib/image';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function ExamPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const { examTypes, isLoading } = useSelector(state => state.examType);
    const [openCreateCustomExamModal, setOpenCreateCustomExamModal] =
        useState<boolean>(false);

    useEffect(() => {
        dispatch(setTitle('İmtihanlar'));
        dispatch(getExamTypes());
    }, [dispatch]);

    const handleExamCreate = (id: number) => {
        const res = dispatch(
            createExam({
                type: 'normal',
                id,
            }),
        );

        toast.promise(res, {
            loading: 'İmtihan oluşturuluyor...',
            success: () => {
                router.push('/exam/test');
                return 'İmtihan oluşturuldu. Yönlendiriliyorsunuz...';
            },
            error: 'İmtihan oluşturulurken bir hata oluştu.',
        });
    };

    return (
        <>
            <main>
                <CreateCustomExamModal
                    open={openCreateCustomExamModal}
                    setIsOpen={setOpenCreateCustomExamModal}
                />

                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Link href={'/exam/result'}>
                            <Button className="w-full">Sonuçlarım</Button>
                        </Link>
                        <Button
                            id="custom-exam-btn"
                            onClick={() => setOpenCreateCustomExamModal(true)}>
                            İmtihan ol
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
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
                    ) : examTypes.length > 0 ? (
                        examTypes?.map(
                            (examType: IExamTypeResponse, key: number) => (
                                <Card className="announcement-card" key={key}>
                                    <div className="relative">
                                        <Image
                                            className="rounded-t-lg object-cover"
                                            src={createImageUrl(examType?.src)}
                                            width={640}
                                            height={280}
                                            alt={examType?.name}
                                        />
                                        <div className="absolute inset-2">
                                            <Badge>{examType.name}</Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle>
                                            {examType?.name.slice(0, 35)}
                                        </CardTitle>
                                        <CardDescription>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: examType?.description
                                                        ? examType.description.slice(
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
                                            className="exam w-full"
                                            onClick={() =>
                                                handleExamCreate(examType.id)
                                            }>
                                            İmtihan ol
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ),
                        )
                    ) : (
                        <Card className="col-span-full flex flex-col lg:flex-row items-center lg:max-w-4xl">
                            <CardHeader className="order-last lg:order-first">
                                <CardTitle>
                                    Henüz görülecek bir şey yok.
                                </CardTitle>
                                <CardDescription>
                                    Şu anda sistemde yayınlanmış bir sınav
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
                </div>
            </main>
        </>
    );
}
