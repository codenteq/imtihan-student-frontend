import { createContext } from 'react';
import {
    IAuthStatusResponse,
    IAuthUserResponse,
    IForgotPasswordForm,
    ILoginForm,
    IRegisterForm,
    IResetPasswordForm,
} from '@/types/IAuth';
import { AxiosResponse } from 'axios';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

export type AuthValidationErrors = Record<string, string[] | string> | null;

/* eslint-disable no-unused-vars */
interface IAuthContext {
    user: IAuthUserResponse | null;
    status: AuthStatus;
    errorMessages: AuthValidationErrors;
    login(_data: ILoginForm): Promise<IAuthUserResponse>;
    register(_data: IRegisterForm): Promise<IAuthUserResponse>;
    resetPassword(
        _data: IResetPasswordForm,
    ): Promise<AxiosResponse<IAuthStatusResponse>>;
    forgotPassword(
        _data: IForgotPasswordForm,
    ): Promise<AxiosResponse<IAuthStatusResponse>>;
    resendEmailVerification(): Promise<AxiosResponse<IAuthStatusResponse>>;
    logout(): Promise<void>;
    destroySession(): void;
}

const defaultAuthFunction = (): never => {
    throw new Error('useAuthContext must be used within an AuthProvider');
};

export const AuthContext = createContext<IAuthContext>({
    user: null,
    status: 'loading',
    errorMessages: null,
    login: defaultAuthFunction,
    register: defaultAuthFunction,
    resetPassword: defaultAuthFunction,
    forgotPassword: defaultAuthFunction,
    resendEmailVerification: defaultAuthFunction,
    logout: defaultAuthFunction,
    destroySession: defaultAuthFunction,
});

