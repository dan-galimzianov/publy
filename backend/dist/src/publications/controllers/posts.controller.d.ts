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
            name: string;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    }>;
    findAll(user: CurrentUser): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    })[]>;
    findOne(id: string, user: CurrentUser): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, user: CurrentUser): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    }>;
    remove(id: string, user: CurrentUser): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    }>;
}
