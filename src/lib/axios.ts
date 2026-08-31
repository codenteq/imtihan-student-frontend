import Axios, { AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

/*
axios.interceptors.response.use(
    res => res,
    error =>
        Promise.reject(
            (error.response && error.response.data) || 'Something went wrong',
        ),
);
*/

export default axios;
