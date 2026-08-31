'use client';
import { useEffect, ReactNode, useState } from 'react';
import { AuthContext, AuthStatus } from './AuthContext';
import {
    forgotPasswordAPI,
    getMeAPI,
    loginAPI,
    logoutAPI,
    registerAPI,
    resendVerificationEmailAPI,
    resetPasswordAPI,
} from '@/services/auth';
import {
    IAuthUserResponse,
    IForgotPasswordForm,
    ILoginForm,
    IRegisterForm,
    IResetPasswordForm,
} from '@/types/IAuth';
import { useRouter } from 'next/navigation';
import { da } from 'date-fns/locale';

interface IAuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IAuthUserResponse | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');
    const [errorMessages, setErrorMessages] = useState<string[] | null>(null); // Hata mesajı durum değişkenini tanımlayın
    const { push } = useRouter();

    async function login(data: ILoginForm) {
        await loginAPI(data)
            .then(data => {
                setErrorMessages(null);
                setUser(data);
                setStatus('authenticated');
            })
            .catch(err => {
                setErrorMessages(
                    err?.response?.data?.errors ||
                        err?.errors || { email: err?.response?.data?.message },
                );
                setUser(null);
                throw err;
            });
    }

    async function register(data: IRegisterForm) {
        registerAPI(data)
            .then(data => {
                setErrorMessages(null);
                setUser(data);
                setStatus('authenticated');
            })
            .catch(err => {
                setErrorMessages(
                    err?.response?.data?.errors ||
                        err?.errors || { email: err?.response?.data?.message },
                );
                setUser(null);
                return err.response?.data;
            });
    }

    async function forgotPassword(data: IForgotPasswordForm) {
        return forgotPasswordAPI(data).catch(err => {
            setErrorMessages(err.errors);
        });
    }

    async function resetPassword(data: IResetPasswordForm) {
        return resetPasswordAPI(data).catch(err => {
            setErrorMessages(err.errors);
        });
    }

    async function resendEmailVerification() {
        return await resendVerificationEmailAPI();
    }

    async function destroySession() {
        setUser(null);
        setStatus('unauthenticated');
    }

    async function logout() {
        logoutAPI()
            .then(() => {
                destroySession();
            })
            .catch(() => {
                destroySession();
            });
    }

    useEffect(() => {
        getMeAPI()
            .then(data => {
                setStatus('authenticated');
                setUser(data);
            })
            .catch(async () => {
                await destroySession();
            });
    }, []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            push('/auth/login');
        }
    }, []);

    useEffect(() => {
        if (
            status === 'authenticated' &&
            window.location.pathname.startsWith('/auth/') &&
            window.location.pathname !== '/auth/verify-email' &&
            window.location.pathname !== '/auth/wait-list'
        ) {
            push('/');
        }
    }, [status]);

    return (
        <AuthContext.Provider
            value={{
                user,
                status,
                errorMessages,
                login,
                register,
                forgotPassword,
                resetPassword,
                resendEmailVerification,
                logout,
                destroySession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
