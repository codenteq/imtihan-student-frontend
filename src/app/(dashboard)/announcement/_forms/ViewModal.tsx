'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { ReactNode, useEffect } from 'react';
import { getAnnouncement } from '@/store/slices/announcement';
import Image from 'next/image';
import createImageUrl from '@/lib/image';
import { Badge, Modal } from '@codenteq/interfeys';

interface IViewModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
    id: number | null;
}

export default function ViewModal({
    open,
    setIsOpen,
    id,
}: IViewModalProps): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { announcement, isLoading } = useSelector(
        state => state.announcement,
    );

    useEffect(() => {
        if (id) {
            dispatch(getAnnouncement(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {open && announcement && (
                <Modal
                    title={announcement?.name}
                    isOpen={open}
                    setIsOpen={setIsOpen}>
                    {isLoading ? (
                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 w-48 mb-4" />
                            <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 max-w-[360px] mb-2.5" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Image
                                src={createImageUrl(announcement?.src)}
                                width={670}
                                height={236}
                                alt={announcement?.name}
                                className="max-w-full h-auto rounded-lg duration-300 filter grayscale hover:grayscale-0"
                            />

                            <Badge>
                                {new Date(
                                    announcement?.created_at,
                                ).toLocaleString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </Badge>

                            <h1 className="text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                                {announcement?.name}
                            </h1>

                            <p
                                className="text-zinc-500 dark:text-zinc-400"
                                dangerouslySetInnerHTML={{
                                    __html: announcement?.content,
                                }}
                            />
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}
