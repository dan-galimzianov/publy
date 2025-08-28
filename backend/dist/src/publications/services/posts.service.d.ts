import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, userId: string): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<{
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
    remove(id: string, userId: string): Promise<{
        id: string;
        content: string;
        status: import("@prisma/client").$Enums.PostStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
