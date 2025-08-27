import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateTargetAudiencesDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
