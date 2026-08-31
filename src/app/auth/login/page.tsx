'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Label, Switch } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function LoginPage() {
    const params = useSearchParams();
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { login, errorMessages } = useAuthContext();

    const [isRevealPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);

    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const reset = params.get('reset');
        if (reset && reset.length > 0 && errorMessages?.length === 0) {
            setStatus(atob(reset as string));
        } else {
            setStatus(null);
        }
    }, []);

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        login({
            email,
            password,
            remember: shouldRemember,
        })
            .then(() => {
                push('/');
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <div>
                            <ApplicationLogo width={144} height={32} />
                        </div>
                    </Link>
                }>
                <div className="flex flex-col">
                    <p className="my-4 text-center text-sm">
                        Devam etmek için lütfen İmtihan'a giriş yapın.
                    </p>

                    <GoogleAuthButton label="Google ile devam et" />
                </div>

                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 h-px bg-zinc-200 border-0 dark:bg-zinc-700 w-full" />
                    <span className="absolute left-1/2 px-3 font-medium text-zinc-900 -translate-x-1/2 bg-white dark:text-white dark:bg-black">
                        veya
                    </span>
                </div>

                <form onSubmit={submitForm}>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Email Address */}
                        <div>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                placeholder="E-posta adresi veya kullanıcı adı"
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
                                type={isRevealPassword ? 'text' : 'password'}
                                value={password}
                                className="pr-10"
                                placeholder="Şifre"
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                                minLength={8}
                            />
                            <p className="text-sm text-[#f43f5e]">
                                {errorMessages?.password}
                            </p>

                            {/* Session Status */}
                            <AuthSessionStatus className="mt-4" status={status} />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="remember_me"
                                name="remember"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />
                            <Label htmlFor="remember_me">Beni hatırla</Label>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex items-center justify-between mt-4">
                        <Link href="/auth/forgot-password">
                            <span className="underline text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-500">
                                Şifrenizi mi unuttunuz?
                            </span>
                        </Link>

                        <Button isLoading={isLoading} loader="Lütfen bekleyin" type="submit">
                            Giriş yap
                        </Button>
                    </div>
                </form>

                <hr className="my-8 w-full h-px bg-zinc-200 border-0 dark:bg-zinc-700" />

                <div className="dark:bg-black w-full">
                    <div className="flex flex-col">
                        <p className="my-4 text-center text-sm text-zinc-900 dark:text-zinc-300">
                            Hesabınız yok mu?
                        </p>

                        <Link href="/auth/register">
                            <div className="dark:text-white text-zinc-900 border hover:border-brand font-medium rounded-full text-lg text-center py-2.5">
                                İmtihan için kaydolun.
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="text-center my-4">
                    <Label className="text-xs">
                        Bu site CAPTCHA tarafından korunmaktadır ve CloudFlare{' '}
                        <Link
                            href="https://www.cloudflare.com/privacypolicy/"
                            className="underline"
                            target="_blank">
                            Gizlilik Politikası
                        </Link>{' '}
                        ile{' '}
                        <Link
                            href="https://www.cloudflare.com/website-terms/"
                            className="underline"
                            target="_blank">
                            Hizmet Koşulları
                        </Link>{' '}
                        geçerlidir.
                    </Label>
                </div>
            </AuthCard>
        </GuestLayout>
    );
}
