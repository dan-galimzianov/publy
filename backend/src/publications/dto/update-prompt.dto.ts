import { IsOptional, IsString } from 'class-validator';

export class UpdatePromptDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  text?: string;
}
