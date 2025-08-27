import { ConfigService } from '@nestjs/config';
import { GenerateTextDto } from '../dto/generate-text.dto';
export declare class OpenAiService {
    private readonly configService;
    private readonly openaiClient;
    constructor(configService: ConfigService);
    generateText(generateTextDto: GenerateTextDto): Promise<{
        generatedText: string;
    }>;
}
