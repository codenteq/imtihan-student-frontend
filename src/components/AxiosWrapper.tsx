import { ReactNode, useEffect } from 'react';
import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface IAxiosWrapper {
    children: ReactNode;
}

export default function AxiosWrapper({ children }: IAxiosWrapper) {
    const { destroySession } = useAuthContext();
    const { push } = useRouter();

    const resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
            if (
                isAxiosError(error) &&
                error.code === AxiosError.ERR_BAD_REQUEST
            ) {
                const statusCode = error.response?.status;

                if (statusCode === HttpStatusCode.Forbidden) {
                    push('/forbidden');
                    return;
                } else if (statusCode === HttpStatusCode.Unauthorized) {
                    destroySession();
                }
            }
            return Promise.reject(
                (error.response && error.response.data) ||
                'Something went wrong',
            );
        },
    );

    useEffect(
        () => () => {
            axios.interceptors.response.eject(resInterceptor);
        },
        [resInterceptor],
    );

    return children;
}
