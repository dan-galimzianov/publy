import { AiGenerationService } from '../services/ai-generation.service';
import { GenerateSystemRolesDto } from '../dto/generate-system-roles.dto';
import { GenerateTargetAudiencesDto } from '../dto/generate-target-audiences.dto';
import { GeneratePostStructuresDto } from '../dto/generate-post-structures.dto';
import { GenerateFinalPostDto } from '../dto/generate-final-post.dto';
export declare class AiGenerationController {
    private readonly aiGenerationService;
    constructor(aiGenerationService: AiGenerationService);
    generateSystemRoles(dto: GenerateSystemRolesDto): Promise<{
        roles: {
            id: string;
            name: string;
            description: string;
        }[];
    }>;
    generateTargetAudiences(dto: GenerateTargetAudiencesDto): Promise<{
        audiences: {
            id: string;
            name: string;
            description: string;
            characteristics: string[];
        }[];
    }>;
    generatePostStructures(dto: GeneratePostStructuresDto): Promise<{
        structures: {
            id: string;
            name: string;
            description: string;
        }[];
    }>;
    getPlatforms(): {
        platforms: {
            id: string;
            name: string;
            description: string;
        }[];
    };
    getFormats(): {
        formats: {
            id: string;
            name: string;
            description: string;
        }[];
    };
    getTones(): {
        tones: {
            id: string;
            name: string;
            description: string;
        }[];
    };
    getModels(): {
        models: {
            id: string;
            provider: string;
            name: string;
            description: string;
        }[];
    };
    generateFinalPost(dto: GenerateFinalPostDto): Promise<{
        post: {
            title: string;
            content: string;
            hashtags: string[];
            call_to_action: string;
        };
    }>;
}
