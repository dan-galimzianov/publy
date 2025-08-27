import { OpenAiService } from '../services/openai.service';
import { GenerateTextDto } from '../dto/generate-text.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class GenerationController {
    private readonly openAiService;
    private readonly prisma;
    constructor(openAiService: OpenAiService, prisma: PrismaService);
    generateText(generateTextDto: GenerateTextDto): Promise<{
        generatedText: string;
    }>;
    getPostFormatPrompts(): Promise<{
        id: string;
        name: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
