'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import menuConfig, { IMenuItem } from '@/config/menu';
import { Avatar, Label } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import React from 'react';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const path = usePathname();
    const menus = menuConfig.desktop;
    const { user } = useAuthContext();

    const userSplit: string =
        user?.full_name
            ?.split(' ')
            .map((name: any) => name[0])
            .join('') || '';

    return (
        <aside
            className={`${className} text-zinc-900 dark:text-zinc-300 border-r border-zinc-100 dark:border-zinc-900 drop-shadow-sm bg-white dark:bg-black hidden lg:block w-72 z-10`}>
            <div className="flex flex-col items-center my-4">
                {user?.avatar ? (
                    <Avatar src={user?.avatar} />
                ) : (
                    <Avatar fallback={userSplit} />
                )}
                <Label>
                    {user?.full_name}
                </Label>
            </div>
            <ul className="text-lg list-none">
                {menus?.map((item: IMenuItem, index: number) => (
                    <Link href={item.path} key={index}>
                        <li
                            className={`${
                                path === item.path ? 'text-brand' : ''
                            } flex items-center p-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg`}>
                            {item.icon}
                            <label className="cursor-pointer mx-2">
                                {item.name}
                            </label>
                        </li>
                    </Link>
                ))}
            </ul>
        </aside>
    );
}
