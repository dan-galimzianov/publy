import { AxiosInstance } from "axios";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostFormatPrompts,
  generateText,
  getPrompts,
  getPrompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
  getPlatforms,
  getFormats,
  getTones,
  getModels,
  generateSystemRoles,
  generateTargetAudiences,
  generatePostStructures,
  generateFinalPost,
} from "./endpoints";
import { User } from "@/types";

export const get =
  <Req, Resp>(apiClient: AxiosInstance, url: string) =>
  async (params?: Req): Promise<Resp> => {
    const response = await apiClient.get(url, { params });
    return response.data;
  };

export const post =
  <Req, Resp>(apiClient: AxiosInstance, url: string) =>
  async (data?: Req): Promise<Resp> => {
    const response = await apiClient.post(url, data);
    return response.data;
  };

export const patch =
  <Req, Resp>(apiClient: AxiosInstance, url: string) =>
  async (data?: Req): Promise<Resp> => {
    const response = await apiClient.patch(url, data);
    return response.data;
  };

export const del =
  <Req, Resp>(apiClient: AxiosInstance, url: string) =>
  async (data?: Req): Promise<Resp> => {
    const response = await apiClient.delete(url, { data });
    return response.data;
  };

export const createApiClient = (apiClient: AxiosInstance) => {
  return {
    // Auth
    getMyProfile: get<unknown, User>(apiClient, "/auth/me"),
    telegramAuth: post<{ initData: string }, User>(apiClient, "/telegram/auth"),

    // Posts
    createPost: createPost(apiClient),
    getPosts: getPosts(apiClient),
    getPost: getPost(apiClient),
    updatePost: updatePost(apiClient),
    deletePost: deletePost(apiClient),

    // Legacy generation
    getPostFormatPrompts: getPostFormatPrompts(apiClient),
    generateText: generateText(apiClient),

    // Prompts
    getPrompts: getPrompts(apiClient),
    getPrompt: getPrompt(apiClient),
    createPrompt: createPrompt(apiClient),
    updatePrompt: updatePrompt(apiClient),
    deletePrompt: deletePrompt(apiClient),

    // AI Generation - Hardcoded options
    getPlatforms: getPlatforms(apiClient),
    getFormats: getFormats(apiClient),
    getTones: getTones(apiClient),
    getModels: getModels(apiClient),

    // AI Generation - AI-powered steps
    generateSystemRoles: generateSystemRoles(apiClient),
    generateTargetAudiences: generateTargetAudiences(apiClient),
    generatePostStructures: generatePostStructures(apiClient),
    generateFinalPost: generateFinalPost(apiClient),
  };
};
