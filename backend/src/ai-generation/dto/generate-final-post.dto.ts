import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateFinalPostDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  format: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  audience: string;

  @IsString()
  @IsNotEmpty()
  structure: string;

  @IsString()
  @IsNotEmpty()
  tone: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}
