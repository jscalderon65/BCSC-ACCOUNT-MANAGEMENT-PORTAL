import axios from "axios";
import {
  BACKEND_URL,
  CLIENT_TOKEN_STORAGE_NAME,
  LOGIN_ROUTE,
} from "@constants/app-config";
import {
  showGeneralErrorAlert,
  showSessionExpiredAlert,
} from "@notifications/app-notifications";

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
      showSessionExpiredAlert();
    } else {
      showGeneralErrorAlert();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
