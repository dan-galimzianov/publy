import { createApiClient } from "./create-api-client";
import axios from "axios";
import { nextCookieInterceptor } from "./next-cookie-interceptor";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

nextCookieInterceptor(axiosInstance);

export const serverApi = createApiClient(axiosInstance);
