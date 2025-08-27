import axios from "axios";
import { createApiClient } from "./create-api-client";

export const clientApi = createApiClient(
  axios.create({
    baseURL: typeof window !== "undefined" ? "/api" : "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
);
