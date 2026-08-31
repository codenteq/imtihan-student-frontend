'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import {
    deleteClassSchedule,
    getClassSchedules,
} from '@/store/slices/class-schedule';
import Lottie from '../../../../public/lottie/animation_llpjqp34.json';
import { IClassScheduleResponse } from '@/types/IClassSchedule';
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
import { TrashIcon } from '@heroicons/react/24/outline';
import CreateModal from '@/app/(dashboard)/class-schedule/_forms/CreateModal';
import EditModal from '@/app/(dashboard)/class-schedule/_forms/EditModal';
import ViewModal from '@/app/(dashboard)/class-schedule/_forms/ViewModal';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const { classSchedules, isLoading } = useSelector(
        state => state.classSchedule,
    );

    useEffect(() => {
        dispatch(setTitle('Ders Programı'));
        dispatch(getClassSchedules());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (confirm('Emin misiniz?')) {
            dispatch(deleteClassSchedule(id));
        }
    };

    const handleEdit = (id: number) => {
        setOpenEditModal(true);
        setId(id);
    };

    const handleView = (id: number) => {
        setOpenViewModal(true);
        setId(id);
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Button onClick={() => setOpenCreateModal(true)}>
                            Oluştur
                        </Button>
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
                    ) : classSchedules.length > 0 ? (
                        classSchedules.map(
                            (
                                classSchedule: IClassScheduleResponse,
                                key: number,
                            ) => (
                                <Card className="classSchedule-card" key={key}>
                                    <CardHeader>
                                        <CardTitle>
                                            <Button
                                                id="view"
                                                variant="link"
                                                className="!p-0"
                                                onClick={() =>
                                                    handleView(
                                                        classSchedule?.id,
                                                    )
                                                }>
                                                {classSchedule?.name.slice(
                                                    0,
                                                    35,
                                                )}
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>
                                            <p className="text-zinc-600">
                                                {classSchedule?.description
                                                    ? classSchedule.description.slice(
                                                          0,
                                                          50,
                                                      )
                                                    : ''}
                                            </p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-500">
                                            Başlangıç Tarihi:{' '}
                                            {classSchedule?.start_date
                                                ? new Date(
                                                      classSchedule.start_date,
                                                  ).toLocaleString('tr-TR', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })
                                                : ''}
                                        </p>
                                        <p className="text-zinc-500">
                                            Bitiş Tarihi:{' '}
                                            {classSchedule?.end_date
                                                ? new Date(
                                                      classSchedule.end_date,
                                                  ).toLocaleString('tr-TR', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })
                                                : ''}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex gap-2">
                                        <Button
                                            id="edit"
                                            onClick={() =>
                                                handleEdit(classSchedule?.id)
                                            }
                                            className="w-full">
                                            Düzenle
                                        </Button>
                                        <Button
                                            id="remove"
                                            variant="destructive"
                                            size="icon"
                                            className="rounded-lg"
                                            onClick={() =>
                                                handleDelete(classSchedule?.id)
                                            }>
                                            <TrashIcon className="w-5" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ),
                        )
                    ) : (
                        <Card className="col-span-full flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                            <CardHeader className="order-last lg:order-first">
                                <CardTitle>
                                    Hadi ders programınızı oluşturalım.
                                </CardTitle>
                                <CardDescription>
                                    Ders prgoramınızı oluşturarak tarihi, zamanı
                                    ve dersi belirleyin.
                                    <Button
                                        className="w-full lg:max-w-xs mt-4"
                                        onClick={() =>
                                            setOpenCreateModal(true)
                                        }>
                                        Program Oluştur
                                    </Button>
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
                <CreateModal
                    open={openCreateModal}
                    setIsOpen={setOpenCreateModal}
                />
                <ViewModal
                    open={openViewModal}
                    setIsOpen={setOpenViewModal}
                    id={id}
                />
                {id && (
                    <EditModal
                        open={openEditModal}
                        setIsOpen={setOpenEditModal}
                        id={id}
                    />
                )}
            </main>
        </>
    );
}
