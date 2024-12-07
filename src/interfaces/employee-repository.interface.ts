import { Employee } from '../entities/employee.entity';

export interface IEmployeeRepository {
  createEmployee(data: Partial<Employee>): Promise<Employee>;
  findOneById(employeeId: string): Promise<Employee | null>;
  saveEmployee(employee: Employee): Promise<Employee>;
  findAll(): Promise<Employee[]>;
}

export const EMPLOYEE_REPOSITORY_TOKEN = Symbol('IEmployeeRepository');
