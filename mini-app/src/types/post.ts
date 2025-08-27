import { User } from "./user";

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Post = {
  id: string;
  content: string;
  userId: string;
  user: User;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
};
