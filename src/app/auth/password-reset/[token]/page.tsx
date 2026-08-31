'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

const PasswordReset = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const passwordResetToken = token as string;

    const { resetPassword, errorMessages } = useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const submitForm = (event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            token: passwordResetToken,
        })
            .then(res => {
                setStatus(res?.data?.status);
                setIsLoading(false);
                if (res.status === 200) {
                    setTimeout(() => {
                        push('/auth/login');
                    }, 1500);
                }
            })
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {
        setEmail(searchParams.get('email') || '');
    }, [searchParams.get('email')]);

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
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Email Address */}
                        <div>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                placeholder="Eposta"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                            <p className="text-sm text-[#f43f5e]">
                                {errorMessages?.email}
                            </p>
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="pr-10"
                                placeholder="Şifre"
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                            <p className="text-sm text-[#f43f5e]">
                                {errorMessages?.password}
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Input
                                id="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                className="pr-10"
                                placeholder="Şifreyi Onayla"
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                required
                            />
                            <p className="text-sm text-[#f43f5e]">
                                {errorMessages?.password_confirmation}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button isLoading={isLoading} loader="Lütfen bekleyin" type="submit">
                            Şifreyi Sıfırla
                        </Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
};

export default PasswordReset;
