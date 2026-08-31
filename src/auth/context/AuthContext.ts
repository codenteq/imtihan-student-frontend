import { createContext } from 'react';
import {
    IAuthUserResponse,
    IForgotPasswordForm,
    ILoginForm,
    IRegisterForm,
    IResetPasswordForm,
} from '@/types/IAuth';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

export type AuthValidationErrors = Record<string, string[] | string> | null;

interface IAuthContext {
    user: IAuthUserResponse | null;
    status: AuthStatus;
    errorMessages: AuthValidationErrors;
    login: (data: ILoginForm) => Promise<IAuthUserResponse>;
    register: (data: IRegisterForm) => Promise<IAuthUserResponse>;
    resetPassword: (data: IResetPasswordForm) => Promise<unknown>;
    forgotPassword: (data: IForgotPasswordForm) => Promise<unknown>;
    resendEmailVerification: () => Promise<unknown>;
    logout: () => void;
    destroySession: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    status: 'loading',
    errorMessages: null,
    login: () => new Promise(() => {}),
    register: () => new Promise(() => {}),
    resetPassword: () => new Promise(() => {}),
    forgotPassword: () => new Promise(() => {}),
    resendEmailVerification: () => new Promise(() => {}),
    logout() {},
    destroySession() {},
});

