import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, userId: string): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<{
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
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
    }>;
}
