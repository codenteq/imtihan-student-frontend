import axios from '@/lib/axios';
import {
    IAuthStatusResponse,
    IAuthUserResponse,
    IForgotPasswordForm,
    ILoginForm,
    IRegisterForm,
    IResetPasswordForm,
} from '@/types/IAuth';
import { AxiosResponse } from 'axios';

export async function loginAPI(data: ILoginForm): Promise<IAuthUserResponse> {
    await csrf();

    return await axios.post('/login', data).then(res => res.data);
}

export async function registerAPI(
    data: IRegisterForm,
): Promise<IAuthUserResponse> {
    await csrf();

    return await axios.post('/register', data).then(res => res.data);
}

export async function forgotPasswordAPI(
    data: IForgotPasswordForm,
): Promise<AxiosResponse<IAuthStatusResponse>> {
    await csrf();

    return await axios.post('/forgot-password', data);
}

export async function resetPasswordAPI(
    data: IResetPasswordForm,
): Promise<AxiosResponse<IAuthStatusResponse>> {
    await csrf();

    return await axios.post('/reset-password', data);
}

export async function resendVerificationEmailAPI(): Promise<
    AxiosResponse<IAuthStatusResponse>
> {
    await csrf();

    return await axios.post('/email/verification-notification');
}

export async function logoutAPI() {
    await csrf();

    return await axios.post('/logout');
}

export async function getMeAPI(): Promise<IAuthUserResponse> {
    await csrf();

    return await axios.get('/api/user').then(res => res.data);
}

export async function csrf() {
    await axios.get('/sanctum/csrf-cookie');
}
