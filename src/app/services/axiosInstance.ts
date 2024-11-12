import axios from "axios";
import Router from "next/router";
import {
  BACKEND_URL,
  LOGIN_ROUTE,
  REDIRECT_AUTH_MIDDLEWARE_ROUTE,
} from "@constants/app-config";

const baseUrlBackend = BACKEND_URL;
const clientTokenStorageName = REDIRECT_AUTH_MIDDLEWARE_ROUTE;
const loginRoute = LOGIN_ROUTE;

const axiosInstance = axios.create({
  baseURL: baseUrlBackend,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(clientTokenStorageName);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
