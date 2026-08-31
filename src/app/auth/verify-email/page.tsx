'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuthContext();

    const [status, setStatus] = useState(null);

    const handleResendEmailVerification = () => {
        resendEmailVerification().then(res => {
            setStatus(res.data.status);
        });
    };

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
                    Kaydolduğunuz için teşekkürler! Başlamadan önce, lütfen size
                    yeni gönderdiğimiz bağlantıya tıklayarak e-posta adresinizi
                    doğrulayabilir misiniz? Eğer e-postayı almadıysanız,
                    memnuniyetle size yeni bir e-posta gönderebiliriz.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        Kayıt sırasında sağladığınız e-posta adresine yeni bir
                        doğrulama bağlantısı gönderildi.
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        type="submit"
                        onClick={handleResendEmailVerification}>
                        Doğrulamayı Yeniden Gönder
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-600"
                        onClick={logout}>
                        Oturumu Kapat
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    );
};

export default VerifyEmail;
