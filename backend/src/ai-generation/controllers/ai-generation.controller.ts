import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AiGenerationService } from '../services/ai-generation.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GenerateSystemRolesDto } from '../dto/generate-system-roles.dto';
import { GenerateTargetAudiencesDto } from '../dto/generate-target-audiences.dto';
import { GeneratePostStructuresDto } from '../dto/generate-post-structures.dto';
import { GenerateFinalPostDto } from '../dto/generate-final-post.dto';

@Controller('ai-generation')
@UseGuards(JwtAuthGuard)
export class AiGenerationController {
  constructor(private readonly aiGenerationService: AiGenerationService) {}

  @Post('system-roles')
  generateSystemRoles(@Body() dto: GenerateSystemRolesDto) {
    return this.aiGenerationService.generateSystemRoles(dto);
  }

  @Post('target-audiences')
  generateTargetAudiences(@Body() dto: GenerateTargetAudiencesDto) {
    return this.aiGenerationService.generateTargetAudiences(dto);
  }

  @Post('post-structures')
  generatePostStructures(@Body() dto: GeneratePostStructuresDto) {
    return this.aiGenerationService.generatePostStructures(dto);
  }

  @Get('platforms')
  getPlatforms() {
    return this.aiGenerationService.getPlatforms();
  }

  @Get('formats')
  getFormats() {
    return this.aiGenerationService.getFormats();
  }

  @Get('tones')
  getTones() {
    return this.aiGenerationService.getTones();
  }

  @Get('models')
  getModels() {
    return this.aiGenerationService.getModels();
  }

  @Post('generate-final-post')
  generateFinalPost(@Body() dto: GenerateFinalPostDto) {
    return this.aiGenerationService.generateFinalPost(dto);
  }
}
