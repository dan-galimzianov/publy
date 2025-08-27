import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';

@Injectable()
export class PromptsService {
  constructor(private prisma: PrismaService) {}

  async create(createPromptDto: CreatePromptDto, userId: string) {
    return this.prisma.prompt.create({
      data: {
        name: createPromptDto.name,
        text: createPromptDto.text,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.prompt.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const prompt = await this.prisma.prompt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    if (!prompt) {
      throw new NotFoundException('Промпт не найден');
    }

    if (prompt.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этому промпту');
    }

    return prompt;
  }

  async update(id: string, updatePromptDto: UpdatePromptDto, userId: string) {
    await this.findOne(id, userId); // Проверяем существование и доступ

    return this.prisma.prompt.update({
      where: { id },
      data: updatePromptDto,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Проверяем существование и доступ

    return this.prisma.prompt.delete({
      where: { id },
    });
  }
}
