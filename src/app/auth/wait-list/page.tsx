'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

const WaitList = () => {
    const { logout } = useAuthContext();
    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <span>
                            <ApplicationLogo width={144} height={32} />
                        </span>
                    </Link>
                }>
                <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                    Geleceğin Başarı Anahtarı İmtihan bekleyen listesine
                    katıldığınız için teşekkür ederiz. İmtihan, geleceğin
                    eğitimini şekillendirmeye yardımcı olacak bir araç ve
                    sizinle bu yolculuğa çıkmayı dört gözle bekliyoruz.
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            type="button"
                            className="underline text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-600"
                            onClick={logout}>
                            Oturumu Kapat
                        </button>
                    </div>
                </div>
            </AuthCard>
        </GuestLayout>
    );
};

export default WaitList;