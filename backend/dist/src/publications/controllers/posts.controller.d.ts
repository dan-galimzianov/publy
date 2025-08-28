import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import type { CurrentUser } from '../../auth/types';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: CurrentUser): Promise<{
        user: {
            id: string;
            username: string;
            name: string;
        };
    } & {
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(user: CurrentUser): Promise<({
        user: {
            id: string;
            username: string;
            name: string;
        };
    } & {
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findOne(id: string, user: CurrentUser): Promise<{
        user: {
            id: string;
            username: string;
            name: string;
        };
    } & {
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, user: CurrentUser): Promise<{
        user: {
            id: string;
            username: string;
            name: string;
        };
    } & {
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string, user: CurrentUser): Promise<{
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
