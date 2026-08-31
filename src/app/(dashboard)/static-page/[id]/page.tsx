'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getStaticPage } from '@/store/slices/static-page';
import { setTitle } from '@/store/slices/root';
import { Badge } from '@codenteq/interfeys';

export default function StaticPageViewPage() {
    const { id } = useParams();
    const staticPageId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { staticPage, isLoading } = useSelector(state => state.staticPage);

    useEffect(() => {
        if (id) {
            dispatch(getStaticPage(staticPageId));
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setTitle(staticPage?.name as string));
    }, [staticPage]);

    return (
        <>
            <main>
                {isLoading ? (
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 w-48 mb-4" />
                        <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 max-w-[360px] mb-2.5" />
                    </div>
                ) : (
                    <div className="max-w-4xl space-y-4">
                        <Badge>
                            {new Date(staticPage?.created_at).toLocaleString(
                                'tr-TR',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                        </Badge>

                        <h1 className="text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                            {staticPage?.name}
                        </h1>

                        <p
                            className="font-light text-zinc-600 dark:text-zinc-400"
                            dangerouslySetInnerHTML={{
                                __html:
                                    typeof staticPage?.content === 'string'
                                        ? staticPage.content
                                        : '',
                            }}
                        />
                    </div>
                )}
            </main>
        </>
    );
}
