import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateSystemRolesDto {
  @IsString()
  @IsNotEmpty()
  topic: string;
}
