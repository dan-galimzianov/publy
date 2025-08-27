import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        content: createPostDto.content,
        user: {
          connect: {
            id: userId,
          },
        },
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
    return this.prisma.post.findMany({
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
    const post = await this.prisma.post.findUnique({
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

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этому посту');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    await this.findOne(id, userId); // Проверяем существование и доступ

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
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

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
