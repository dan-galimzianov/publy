import { PromptsService } from '../services/prompts.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import type { CurrentUser } from 'src/auth/types';
export declare class PromptsController {
    private readonly promptsService;
    constructor(promptsService: PromptsService);
    create(createPromptDto: CreatePromptDto, user: CurrentUser): Promise<{
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
    findAll(user: CurrentUser): Promise<({
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
    findOne(id: string, user: CurrentUser): Promise<{
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
    update(id: string, updatePromptDto: UpdatePromptDto, user: CurrentUser): Promise<{
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
    remove(id: string, user: CurrentUser): Promise<{
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
