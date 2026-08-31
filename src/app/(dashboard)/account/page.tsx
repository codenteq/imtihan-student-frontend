'use client';

import {
    ArrowLeftOnRectangleIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    EnvelopeOpenIcon,
    DevicePhoneMobileIcon,
    PencilSquareIcon,
    XCircleIcon,
    FireIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import Footer from '@/layouts/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import config from '@/config/menu';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import InviteFriends from '@/components/InviteFriends';
import ViewModal from '@/app/(dashboard)/account/_forms/ViewModal';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import { Avatar, Label } from '@codenteq/interfeys';

export default function AccountPage(): ReactNode {
    const { user, logout } = useAuthContext();
    const dispatch: AppDispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);

    const userSplit: string =
        user?.full_name
            ?.split(' ')
            .map((name: any) => name[0])
            .join('') || '';

    const handleView = () => {
        setOpenViewModal(true);
    };

    useEffect(() => {
        dispatch(setTitle('Hesabım'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="grid grid-cols-1 gap-1">
                    <div className="border-b border-zinc-100 dark:border-zinc-900 p-5">
                        <div className="float-right cursor-pointer w-10 h-10 p-2">
                            <Link
                                href="/account/settings"
                                id="account-edit-btn">
                                <PencilSquareIcon className="text-brand w-6 h-6" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            {user?.avatar ? (
                                <Avatar src={user?.avatar} />
                            ) : (
                                <Avatar fallback={userSplit} />
                            )}
                            <Label className="!text-base">
                                {user?.full_name}
                            </Label>
                        </div>
                    </div>

                    <div className="border-b border-zinc-100 dark:border-zinc-900 p-5">
                        <EnvelopeOpenIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-900 dark:text-zinc-300">
                            {user?.email}
                        </span>

                        {user?.email_verified_at ? (
                            <span
                                className="text-green-600 dark:text-green-500 float-right"
                                title="E-posta adresi doğrulanmış.">
                                <CheckCircleIcon className="w-6 h-6" />
                            </span>
                        ) : (
                            <span
                                className="text-red-600 dark:text-red-500 float-right"
                                title="E-posta adresi doğrulanmamış.">
                                <XCircleIcon className="w-6 h-6" />
                            </span>
                        )}
                    </div>

                    <div className="p-5">
                        <DevicePhoneMobileIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-900 dark:text-zinc-300">
                            {user?.phone ? (
                                user?.phone
                            ) : (
                                <>Telefon numaranı ekle</>
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between gap-4 my-5">
                    <div className="w-full md:w-[calc(50%-1rem)] flex gap-2 p-4 border border-neutral-200 rounded-2xl">
                        <FireIcon className="w-6 h-6 text-orange-500" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">32</span>
                            <Label>Günlük seri</Label>
                        </div>
                    </div>

                    <div className="w-full md:w-[calc(50%-1rem)] flex gap-2 p-4 border border-neutral-200 rounded-2xl">
                        <TrophyIcon className="w-6 h-6 text-yellow-500" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">86</span>
                            <Label>Başarılar</Label>
                        </div>
                    </div>
                </div>

                <div className="my-10">
                    <InviteFriends />
                </div>

                <div className="grid grid-cols-1">
                    {config.account.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <div className="block lg:hidden border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                                {item.icon}
                                <span className="text-zinc-500 dark:text-zinc-300">
                                    {item.name}
                                </span>
                                <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                            </div>
                        </Link>
                    ))}

                    <ThemeToggle />

                    <div
                        onClick={handleView}
                        className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5 cursor-pointer">
                        <DocumentTextIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-500 dark:text-zinc-300">
                            Sözleşmeler
                        </span>
                        <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                    </div>

                    <div
                        id={'logout-btn'}
                        onClick={logout}
                        className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5 cursor-pointer">
                        <ArrowLeftOnRectangleIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-500 dark:text-zinc-300">
                            Oturumu Kapat
                        </span>
                        <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                    </div>
                </div>

                <Footer className="mt-5" />
            </main>

            <ViewModal open={openViewModal} setIsOpen={setOpenViewModal} />
        </>
    );
}
