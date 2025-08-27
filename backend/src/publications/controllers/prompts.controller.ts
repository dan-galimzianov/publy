import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PromptsService } from '../services/prompts.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../../auth/decorators/current-user.decorator';
import type { CurrentUser } from 'src/auth/types';

@Controller('prompts')
@UseGuards(JwtAuthGuard)
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  create(
    @Body() createPromptDto: CreatePromptDto,
    @GetCurrentUser() user: CurrentUser,
  ) {
    return this.promptsService.create(createPromptDto, user.userId);
  }

  @Get()
  findAll(@GetCurrentUser() user: CurrentUser) {
    return this.promptsService.findAll(user.userId.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetCurrentUser() user: CurrentUser) {
    return this.promptsService.findOne(id, user.userId.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromptDto: UpdatePromptDto,
    @GetCurrentUser() user: CurrentUser,
  ) {
    return this.promptsService.update(
      id,
      updatePromptDto,
      user.userId.toString(),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUser() user: CurrentUser) {
    return this.promptsService.remove(id, user.userId.toString());
  }
}
