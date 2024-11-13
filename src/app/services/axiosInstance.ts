import axios from "axios";
import {
  BACKEND_URL,
  CLIENT_TOKEN_STORAGE_NAME,
  LOGIN_ROUTE,
} from "@/app/common/constants/appConfig";
import { showGeneralErrorAlert } from "@/app/common/notifications/AppNotifications";
import { encryptData } from "../common/helpers/crypto";

const baseUrlBackend = BACKEND_URL;
const clientTokenStorageName = CLIENT_TOKEN_STORAGE_NAME;
const loginRoute = LOGIN_ROUTE;

const axiosInstance = axios.create({
  baseURL: baseUrlBackend,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(clientTokenStorageName);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      window.location.href = loginRoute;
    } else {
      showGeneralErrorAlert();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
