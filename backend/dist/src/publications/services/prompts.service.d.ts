import { PrismaService } from '../../prisma/prisma.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
export declare class PromptsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPromptDto: CreatePromptDto, userId: string): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(userId: string): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, updatePromptDto: UpdatePromptDto, userId: string): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
