import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
