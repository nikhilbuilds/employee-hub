import { CreateEmployeeDto } from 'src/dtos/create-employee.dto';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';

export interface IEmployeeService {
  addEmployee(data: CreateEmployeeDto): Promise<EmployeeResponseDto>;
  updateEmployee(
    employeeId: string,
    data: Partial<EmployeeResponseDto>,
  ): Promise<EmployeeResponseDto | null>;
  getEmployee(employeeId: string): Promise<EmployeeResponseDto | null>;
  getAllEmployees(): Promise<EmployeeResponseDto[]>;
}

export const EMPLOYEE_SERVICE_TOKEN = Symbol('IEmployeeService');
