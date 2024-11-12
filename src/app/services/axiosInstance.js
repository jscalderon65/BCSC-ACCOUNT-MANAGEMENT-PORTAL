/* import axios from 'axios';
import Router from 'next/router';
import constants from '@constants/system';

const baseUrlBackend = constants.ENV.BACKEND_URL;
const clientTokenStorageName = constants.ENV.CLIENT_TOKEN_STORAGE_NAME;
const loginRoute = constants.ENV.REDIRECT.LOGIN_ROUTE;

const axiosInstance = axios.create({
    baseURL: baseUrlBackend,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(clientTokenStorageName);
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            const { success, status } = error.response.data;
            if (!success && status === 401) {
                localStorage.removeItem(clientTokenStorageName);
                Router.push(loginRoute);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
 */
