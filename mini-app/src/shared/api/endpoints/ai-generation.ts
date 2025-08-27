import { AxiosInstance } from "axios";
import { get, post } from "../create-api-client";
import type {
  Platform,
  Format,
  SystemRole,
  TargetAudience,
  PostStructure,
  Tone,
  AiModel,
  GeneratedPost,
} from "@/shared/stores";

// Request/Response типы
export type GenerateSystemRolesRequest = {
  topic: string;
};

export type GenerateSystemRolesResponse = {
  roles: SystemRole[];
};

export type GenerateTargetAudiencesRequest = {
  topic: string;
  role: string;
};

export type GenerateTargetAudiencesResponse = {
  audiences: TargetAudience[];
};

export type GeneratePostStructuresRequest = {
  topic: string;
  role: string;
  audience: string;
};

export type GeneratePostStructuresResponse = {
  structures: PostStructure[];
};

export type GenerateFinalPostRequest = {
  topic: string;
  platform: string;
  format: string;
  role: string;
  audience: string;
  structure: string;
  tone: string;
  model: string;
};

export type GenerateFinalPostResponse = {
  post: GeneratedPost;
};

// Hardcoded options response types
export type GetPlatformsResponse = {
  platforms: Platform[];
};

export type GetFormatsResponse = {
  formats: Format[];
};

export type GetTonesResponse = {
  tones: Tone[];
};

export type GetModelsResponse = {
  models: AiModel[];
};

// API функции
export const getPlatforms = (apiClient: AxiosInstance) =>
  get<unknown, GetPlatformsResponse>(apiClient, "/ai-generation/platforms");

export const getFormats = (apiClient: AxiosInstance) =>
  get<unknown, GetFormatsResponse>(apiClient, "/ai-generation/formats");

export const getTones = (apiClient: AxiosInstance) =>
  get<unknown, GetTonesResponse>(apiClient, "/ai-generation/tones");

export const getModels = (apiClient: AxiosInstance) =>
  get<unknown, GetModelsResponse>(apiClient, "/ai-generation/models");

export const generateSystemRoles = (apiClient: AxiosInstance) =>
  post<GenerateSystemRolesRequest, GenerateSystemRolesResponse>(
    apiClient,
    "/ai-generation/system-roles"
  );

export const generateTargetAudiences = (apiClient: AxiosInstance) =>
  post<GenerateTargetAudiencesRequest, GenerateTargetAudiencesResponse>(
    apiClient,
    "/ai-generation/target-audiences"
  );

export const generatePostStructures = (apiClient: AxiosInstance) =>
  post<GeneratePostStructuresRequest, GeneratePostStructuresResponse>(
    apiClient,
    "/ai-generation/post-structures"
  );

export const generateFinalPost = (apiClient: AxiosInstance) =>
  post<GenerateFinalPostRequest, GenerateFinalPostResponse>(
    apiClient,
    "/ai-generation/generate-final-post"
  );
