import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTextDto {
  @IsString()
  @IsNotEmpty()
  finalPrompt: string;
}
