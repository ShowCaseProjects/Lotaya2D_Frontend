import Axios, { InternalAxiosRequestConfig } from "axios";
import storage from "../utils/storage";
import { API_URL } from "../config";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers!.Authorization = `${token}`;
  }
  config.headers!.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    return message;
  },
);
