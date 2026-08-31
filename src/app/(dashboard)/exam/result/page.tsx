'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import ExamResults from '../../../../../public/lottie/Animation - 1712518772284.json';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Datatable,
} from '@codenteq/interfeys';
import { getExamResults } from '@/store/slices/exam-result';
import { EyeIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function ResultPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [pagePaginate, setPagePaginate] = useState(1);
    const [search, setSearch] = useState('');

    const { examResults, meta, isLoading } = useSelector(
        state => state.examResult,
    );

    const columns = [
        {
            header: 'Sınav',
            accessorKey: 'exam.exam_type.name',
        },
        {
            header: 'Puan',
            accessorKey: 'point',
        },
        {
            header: 'Sınav Oluşturulma Tarihi',
            accessorKey: 'created_at',
            cell: ({ row }: any) =>
                moment(row.original.created_at)
                    .format('d MMM yyyy HH:mm')
                    .toString(),
        },
        {
            header: 'İşlemler',
            cell: ({ row }: any) => (
                <div className="flex items-center space-x-2">
                    <Link href={`/exam/${row.original.exam_id}/view`}>
                        <button className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                            <EyeIcon className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(setTitle('Sonuçlarım'));
        dispatch(getExamResults());
    }, [dispatch, pagePaginate, search]);

    return (
        <>
            {examResults.length == 0 ? (
                <Card className="flex flex-col lg:flex-row items-center justify-between lg:max-w-4xl">
                    <CardHeader className="order-last lg:order-first">
                        <CardTitle>Henüz görülecek bir şey yok.</CardTitle>
                        <CardDescription>
                            Şu anda sistemde yayınlanmış bir sınav sonucu
                            bulunmamaktadır.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72">
                            <LottieAnimation animationData={ExamResults} />
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Datatable
                    columns={columns}
                    data={examResults}
                    pagePaginate={pagePaginate}
                    setPagePaginate={setPagePaginate}
                    meta={meta}
                    isLoading={isLoading}
                    setSearch={setSearch}
                />
            )}
        </>
    );
}
