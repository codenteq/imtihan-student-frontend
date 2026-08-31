'use client';

import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getNote } from '@/store/slices/note';
import { Badge } from '@codenteq/interfeys';

export default function NoteViewPage(): ReactNode {
    const { id } = useParams();
    const noteId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { note, isLoading } = useSelector(state => state.note);

    useEffect(() => {
        if (id) {
            dispatch(getNote(noteId));
        }
    }, [dispatch, id]);

    return (
        <>
            <main>
                {isLoading ? (
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 w-48 mb-4" />
                        <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 max-w-[360px] mb-2.5" />
                    </div>
                ) : (
                    <div className="max-w-4xl p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge>
                                {new Date(note?.created_at).toLocaleString(
                                    'tr-TR',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    },
                                )}
                            </Badge>
                            <Badge variant="outline">
                                {note?.is_everyone ? 'Herkes' : 'Gizli'}
                            </Badge>
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-200 mb-4">
                                {note?.name}
                            </h1>
                            <p
                                className="text-base font-light text-zinc-600 dark:text-zinc-400 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        typeof note?.content === 'string'
                                            ? note.content
                                            : '',
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
