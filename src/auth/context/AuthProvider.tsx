'use client';
import { useEffect, ReactNode, useState } from 'react';
import { AuthContext, AuthStatus, AuthValidationErrors } from './AuthContext';
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

interface IAuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IAuthUserResponse | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');
    const [errorMessages, setErrorMessages] =
        useState<AuthValidationErrors>(null);
    const { push } = useRouter();

    async function login(data: ILoginForm) {
        try {
            setErrorMessages(null);
            const res = await loginAPI(data);
            setUser(res);
            setStatus('authenticated');
            return res;
        } catch (err: any) {
            setErrorMessages(
                err?.response?.data?.errors ||
                    err?.errors || { email: err?.response?.data?.message },
            );
            setUser(null);
            throw err;
        }
    }

    async function register(data: IRegisterForm) {
        try {
            setErrorMessages(null);
            const res = await registerAPI(data);
            setUser(res);
            setStatus('authenticated');
            return res;
        } catch (err: any) {
            setErrorMessages(
                err?.response?.data?.errors ||
                    err?.errors || { email: err?.response?.data?.message },
            );
            setUser(null);
            throw err;
        }
    }

    async function forgotPassword(data: IForgotPasswordForm) {
        try {
            setErrorMessages(null);
            return await forgotPasswordAPI(data);
        } catch (err: any) {
            setErrorMessages(
                err?.response?.data?.errors ||
                    err?.errors || { email: err?.response?.data?.message },
            );
            throw err;
        }
    }

    async function resetPassword(data: IResetPasswordForm) {
        try {
            setErrorMessages(null);
            return await resetPasswordAPI(data);
        } catch (err: any) {
            setErrorMessages(
                err?.response?.data?.errors ||
                    err?.errors || { email: err?.response?.data?.message },
            );
            throw err;
        }
    }

    async function resendEmailVerification() {
        return await resendVerificationEmailAPI();
    }

    async function destroySession() {
        setUser(null);
        setStatus('unauthenticated');
    }

    async function logout() {
        try {
            await logoutAPI();
        } finally {
            destroySession();
        }
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

