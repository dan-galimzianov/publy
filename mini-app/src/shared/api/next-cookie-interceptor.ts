import { AxiosInstance } from "axios";
import { headers } from "next/headers";

export const nextCookieInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    const userHeaders = await headers();
    for (const [key, value] of userHeaders.entries()) {
      config.headers[key] = value;
    }

    return config;
  });
};
