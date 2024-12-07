import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dtos/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dtos/update-employee.dto';
import { EmployeeResponseDto } from 'src/dtos/employee-response.dto';
import {
  EMPLOYEE_SERVICE_TOKEN,
  IEmployeeService,
} from 'src/interfaces/employee-service.interface';

@Controller('employees')
export class EmployeeController {
  constructor(
    @Inject(EMPLOYEE_SERVICE_TOKEN)
    private readonly employeeService: IEmployeeService,
  ) {}

  @Get()
  async getAllEmployees(): Promise<EmployeeResponseDto[]> {
    return await this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return await this.employeeService.getEmployee(id);
  }

  @Post()
  async addEmployee(
    @Body() body: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return await this.employeeService.addEmployee(body);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updatedData: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto | null> {
    return await this.employeeService.updateEmployee(id, updatedData);
  }
}
