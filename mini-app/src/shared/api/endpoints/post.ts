import type { Post, PostStatus } from "@/types";
import { AxiosInstance } from "axios";
import { get, post, patch } from "../create-api-client";

type CreatePostDto = {
  content: string;
  status?: PostStatus;
};

type UpdatePostDto = {
  content?: string;
  status?: PostStatus;
};

export const createPost = (apiClient: AxiosInstance) =>
  post<CreatePostDto, Post>(apiClient, "/posts");

export const getPosts = (apiClient: AxiosInstance) =>
  get<unknown, Post[]>(apiClient, "/posts");

export const getPost = (apiClient: AxiosInstance) => (id: string) =>
  get<unknown, Post>(apiClient, `/posts/${id}`)();

export const updatePost =
  (apiClient: AxiosInstance) => (id: string, data: UpdatePostDto) =>
    patch<UpdatePostDto, Post>(apiClient, `/posts/${id}`)(data);

export const deletePost = (apiClient: AxiosInstance) => (id: string) =>
  apiClient.delete(`/posts/${id}`);
