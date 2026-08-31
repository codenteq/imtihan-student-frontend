'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

const ForgotPassword = () => {
    const { forgotPassword, errorMessages } = useAuthContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);

    const submitForm = (event: { preventDefault: () => void }) => {
        setIsLoading(true);
        event.preventDefault();

        forgotPassword({ email })
            .then(res => setStatus(res?.data?.status))
            .then(() => setIsLoading(false))
            .catch(err => {
                console.log(err);
                setIsLoading(false);
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
                    Şifrenizi mi unuttunuz? Hiç sorun değil. Bize e-posta
                    adresinizi bildirin ve size şifre sıfırlama bağlantısı
                    içeren bir e-posta göndereceğiz. Bu bağlantı üzerinden yeni
                    bir şifre seçme imkanı bulacaksınız.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full"
                            placeholder="Eposta"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        <p className="text-sm text-[#f43f5e]">
                            {errorMessages?.email}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Label
                            onClick={handleGoBack}
                            className="cursor-pointer underline">
                            Vazgeç
                        </Label>

                        <Button isLoading={isLoading} loader="Lütfen bekleyin" type="submit">
                            Eposta Şifre Sıfırlama Bağlantısı
                        </Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
};

export default ForgotPassword;
