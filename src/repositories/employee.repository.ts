import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEmployeeRepository } from 'src/interfaces/employee-repository.interface';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(newEmployee: Partial<Employee>): Promise<Employee> {
    return this.employeeRepository.create(newEmployee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOneById(employeeId: string): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { employeeId } });
  }

  async saveEmployee(newEmployee: Employee): Promise<Employee> {
    return this.employeeRepository.save(newEmployee);
  }
}
