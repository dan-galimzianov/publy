import { AxiosInstance } from "axios";
import { get, post, patch, del } from "../create-api-client";
import { Prompt } from "@/types/prompt";

export type CreatePromptDto = {
  name: string;
  text: string;
};

export type UpdatePromptDto = {
  name?: string;
  text?: string;
};

export const getPrompts = (apiClient: AxiosInstance) =>
  get<unknown, Prompt[]>(apiClient, "/prompts");

export const getPrompt = (apiClient: AxiosInstance) => (id: string) =>
  get<unknown, Prompt>(apiClient, `/prompts/${id}`);

export const createPrompt = (apiClient: AxiosInstance) =>
  post<CreatePromptDto, Prompt>(apiClient, "/prompts");

export const updatePrompt =
  (apiClient: AxiosInstance) => (id: string, data: UpdatePromptDto) =>
    patch<UpdatePromptDto, Prompt>(apiClient, `/prompts/${id}`)(data);

export const deletePrompt = (apiClient: AxiosInstance) => (id: string) =>
  del<unknown, void>(apiClient, `/prompts/${id}`);
