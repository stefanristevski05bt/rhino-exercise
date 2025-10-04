import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class NoteRequest {
  @Transform(({ value }) => value === null ? undefined : value)
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  text?: string;
}