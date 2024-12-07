import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;
}
