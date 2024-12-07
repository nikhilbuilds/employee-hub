import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNumber()
  salary: number;

  @IsString()
  companyId: string;
}
