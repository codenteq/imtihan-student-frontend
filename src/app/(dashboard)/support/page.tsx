'use client';

import React, { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteSupport, getSupports } from '@/store/slices/support';
import { TrashIcon } from '@heroicons/react/24/outline';
import Lottie from '../../../../public/lottie/animation_llpjb9vt.json';
import CreateModal from '@/app/(dashboard)/support/_forms/CreateModal';
import { setTitle } from '@/store/slices/root';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Datatable,
} from '@codenteq/interfeys';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function SupportPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [pagePaginate, setPagePaginate] = useState(1);
    const [search, setSearch] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { supports, meta, isLoading } = useSelector(state => state.support);

    useEffect(() => {
        dispatch(setTitle('Destekler'));
        dispatch(getSupports(pagePaginate, search));
    }, [dispatch, pagePaginate, search]);

    const handleDelete = (id: number) => {
        confirm('Emin misin?') && dispatch(deleteSupport(id));
    };

    const columns = [
        {
            header: 'Konu',
            cell: ({ row }: any) => row.original.subject.slice(0, 25),
        },
        {
            header: 'Oluşturma tarihi',
            cell: ({ row }: any) => {
                const formattedDate = format(
                    new Date(row.original.created_at),
                    'd MMM yyyy HH:mm',
                    { locale: tr },
                );
                return <div>{formattedDate}</div>;
            },
        },
        {
            header: 'İşlemler',
            cell: ({ row }: any) => (
                <div className="flex items-center space-x-2">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(row?.original?.id)}>
                        <TrashIcon className="h-5 w-5" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <main>
                {supports.length === 0 ? (
                    <Card className="flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                        <CardHeader className="order-last lg:order-first">
                            <CardTitle>Henüz görülecek bir şey yok.</CardTitle>
                            <CardDescription>
                                Şu anda sistemde yayınlanmış bir destek mesajı
                                bulunmamaktadır.
                                <Button
                                    className="w-full lg:max-w-xs mt-4"
                                    onClick={() => setOpenCreateModal(true)}>
                                    Destek Oluştur
                                </Button>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-72">
                                <LottieAnimation animationData={Lottie} />
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Datatable
                        columns={columns}
                        data={supports}
                        pagePaginate={pagePaginate}
                        setPagePaginate={setPagePaginate}
                        meta={meta}
                        isLoading={isLoading}
                        tableTopRightHeader={
                            <Button onClick={() => setOpenCreateModal(true)}>
                                Oluştur
                            </Button>
                        }
                        setSearch={setSearch}
                    />
                )}
                <CreateModal
                    open={openCreateModal}
                    setIsOpen={setOpenCreateModal}
                />
            </main>
        </>
    );
}
