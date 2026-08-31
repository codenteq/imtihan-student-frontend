'use client';

import React, { ReactNode, useEffect } from 'react';
import {
    TabGroup,
    TabList,
    TabsTrigger,
    TabPanels,
    TabPanel,
} from '@codenteq/interfeys';
import MembershipInformation from '@/app/(dashboard)/account/settings/_forms/MembershipInformation';
import PasswordEdit from '@/app/(dashboard)/account/settings/_forms/PasswordEdit';
import ContactInformation from '@/app/(dashboard)/account/settings/_forms/ContactInformation';
import { setTitle } from '@/store/slices/root';
import { AppDispatch, useDispatch } from '@/store';

export default function AccountSettingPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Hesap Ayarlarım'));
    }, []);
    return (
        <>
            <main className="w-full lg:max-w-4xl">
                <TabGroup>
                    <TabList className="w-full">
                        <TabsTrigger className=" w-full">
                            Üyelik bilgilerim
                        </TabsTrigger>
                        <TabsTrigger className="password-tab w-full">
                            Şifre değişikliği
                        </TabsTrigger>
                        <TabsTrigger className="contact-tab w-full">
                            İletişim tercihlerim
                        </TabsTrigger>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <MembershipInformation />
                        </TabPanel>
                        <TabPanel>
                            <PasswordEdit />
                        </TabPanel>
                        <TabPanel>
                            <ContactInformation />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}
