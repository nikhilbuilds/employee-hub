import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Employee } from '../entities/employee.entity';
import { convertUTCToLocal } from '../utilities/timezone.util';
import { EmployeeResponseDto } from 'src/dtos/employee-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateEmployeeDto } from 'src/dtos/create-employee.dto';
import { IEmployeeService } from 'src/interfaces/employee-service.interface';
import {
  EMPLOYEE_REPOSITORY_TOKEN,
  IEmployeeRepository,
} from 'src/interfaces/employee-repository.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from 'src/interfaces/user-repository.interface copy';
import {
  COMPANY_REPOSITORY_TOKEN,
  ICompanyRepository,
} from 'src/interfaces/company-repository.interface';

@Injectable()
export class EmployeeService implements IEmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @Inject(EMPLOYEE_REPOSITORY_TOKEN)
    private readonly employeeRepository: IEmployeeRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(COMPANY_REPOSITORY_TOKEN)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async getEmployee(employeeId: string): Promise<EmployeeResponseDto | null> {
    try {
      const employee = await this.employeeRepository.findOneById(employeeId);

      if (!employee) {
        this.logger.warn(`Employee with ID ${employeeId} not found`);
        throw new BadRequestException('Employee not found');
      }

      employee.createdAt = convertUTCToLocal(employee.createdAt);
      employee.modifiedAt = convertUTCToLocal(employee.modifiedAt);

      this.logger.log({ employee });

      return plainToInstance(EmployeeResponseDto, employee);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllEmployees(): Promise<EmployeeResponseDto[]> {
    try {
      const employees = await this.employeeRepository.findAll();
      this.logger.log({ employees });

      //TODO: mapper function
      return employees.map((employee) => {
        employee.createdAt = convertUTCToLocal(employee.createdAt);
        employee.modifiedAt = convertUTCToLocal(employee.modifiedAt);
        return plainToInstance(EmployeeResponseDto, employee);
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve employees',
        error.message,
      );
    }
  }

  async addEmployee(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    try {
      let user = await this.userRepository.findByEmail(data.email);

      if (!user) {
        user = await this.userRepository.createUser({
          name: data.name,
          emailId: data.email,
        });
      }

      // Validate if the company exists
      const company = await this.companyRepository.findOneById(data.companyId);

      if (!company) {
        this.logger.warn(`Company with ID ${data.companyId} not found`);
        throw new Error(`Company with ID ${data.companyId} not found`);
      }

      const employee = await this.employeeRepository.createEmployee({
        position: data.position,
        salary: data.salary,
        company,
        user,
      });

      const saveEmployee = await this.employeeRepository.saveEmployee(employee);
      this.logger.log({ saveEmployee });

      return plainToInstance(EmployeeResponseDto, saveEmployee);
    } catch (error) {
      this.logger.error('Failed to add employee', error.message);

      throw new InternalServerErrorException(
        'Failed to add employee',
        error.message,
      );
    }
  }

  async updateEmployee(
    employeeId: string,
    data: Partial<Employee>,
  ): Promise<EmployeeResponseDto | null> {
    try {
      const employee = await this.employeeRepository.findOneById(employeeId);

      //TODO: Create message constants
      if (!employee) {
        this.logger.warn(`Employee with ID ${employeeId} not found`);
        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
      }

      Object.assign(employee, data);

      const updatedEmployee = await this.employeeRepository.saveEmployee({
        ...employee,
        ...data,
      });

      this.logger.log({ updatedEmployee });

      return plainToInstance(EmployeeResponseDto, updatedEmployee);
    } catch (error) {
      this.logger.error('Failed to update employee', error.message);
      throw new InternalServerErrorException(
        'Failed to update employee',
        error.message,
      );
    }
  }
}
