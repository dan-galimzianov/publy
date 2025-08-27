import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '@prisma/client';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;
}
