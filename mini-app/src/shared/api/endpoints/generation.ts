import { AxiosInstance } from "axios";
import { get, post } from "../create-api-client";

export type PostFormatPrompt = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type GenerateTextRequest = {
  finalPrompt: string;
};

export type GenerateTextResponse = {
  generatedText: string;
};

export const getPostFormatPrompts = (apiClient: AxiosInstance) =>
  get<unknown, PostFormatPrompt[]>(
    apiClient,
    "/generation/post-format-prompts"
  );

export const generateText = (apiClient: AxiosInstance) =>
  post<GenerateTextRequest, GenerateTextResponse>(
    apiClient,
    "/generation/generate-text"
  );
