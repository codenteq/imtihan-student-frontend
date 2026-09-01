'use client';
import { useEffect, ReactNode, useState, useCallback } from 'react';
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
import { useRouter, usePathname } from 'next/navigation';
import { isAxiosError } from 'axios';

interface IAuthProviderProps {
    children: ReactNode;
}

interface IApiErrorResponse {
    message?: string;
    errors?: AuthValidationErrors;
}

function extractValidationErrors(err: unknown): AuthValidationErrors {
    if (isAxiosError<IApiErrorResponse>(err)) {
        const data = err.response?.data;
        if (data?.errors) {
            return data.errors;
        }
        if (data?.message) {
            return { email: data.message };
        }
    }
    return null;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IAuthUserResponse | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');
    const [errorMessages, setErrorMessages] =
        useState<AuthValidationErrors>(null);
    const { push } = useRouter();
    const pathname = usePathname();

    const destroySession = useCallback(() => {
        setUser(null);
        setStatus('unauthenticated');
    }, []);

    async function login(data: ILoginForm) {
        try {
            setErrorMessages(null);
            const res = await loginAPI(data);
            setUser(res);
            setStatus('authenticated');
            return res;
        } catch (err: unknown) {
            setErrorMessages(extractValidationErrors(err));
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
        } catch (err: unknown) {
            setErrorMessages(extractValidationErrors(err));
            setUser(null);
            throw err;
        }
    }

    async function forgotPassword(data: IForgotPasswordForm) {
        try {
            setErrorMessages(null);
            return await forgotPasswordAPI(data);
        } catch (err: unknown) {
            setErrorMessages(extractValidationErrors(err));
            throw err;
        }
    }

    async function resetPassword(data: IResetPasswordForm) {
        try {
            setErrorMessages(null);
            return await resetPasswordAPI(data);
        } catch (err: unknown) {
            setErrorMessages(extractValidationErrors(err));
            throw err;
        }
    }

    async function resendEmailVerification() {
        return await resendVerificationEmailAPI();
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
            .catch(() => {
                destroySession();
            });
    }, [destroySession]);

    useEffect(() => {
        if (status === 'unauthenticated' && !pathname?.startsWith('/auth/')) {
            push('/auth/login');
        }
    }, [status, pathname, push]);

    useEffect(() => {
        if (
            status === 'authenticated' &&
            pathname?.startsWith('/auth/') &&
            pathname !== '/auth/verify-email' &&
            pathname !== '/auth/wait-list'
        ) {
            push('/');
        }
    }, [status, pathname, push]);

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

