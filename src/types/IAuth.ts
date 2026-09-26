export interface ILoginForm {
    email: string;
    password: string;
    remember?: boolean;
}

export interface IRegisterForm {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IForgotPasswordForm {
    email: string;
}

export interface IResetPasswordForm {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

export interface IAuthUserResponse {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    birth_date: Date;
    country_id: number;
    city_id: number;
    state_id: number;
    is_active: boolean;
    language_id: number;
    avatar: string;
    gender: string;
    education_level: string;
    email_verified_at: Date;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export interface IAuthStatusResponse {
    status: string;
}
