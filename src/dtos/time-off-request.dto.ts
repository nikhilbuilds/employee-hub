import { IsNotEmpty, IsUUID, IsInt, IsDateString } from 'class-validator';

export class CreateTimeOffRequestDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid Employee ID' })
  employeeId: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
