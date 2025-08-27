import { IsString, IsNotEmpty } from 'class-validator';

export class GeneratePostStructuresDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  audience: string;
}
