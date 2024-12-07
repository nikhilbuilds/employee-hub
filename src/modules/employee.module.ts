import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '../services/employee.service';
import { EmployeeController } from '../controllers/employee.controller';
import {
  EMPLOYEE_REPOSITORY_TOKEN,
  IEmployeeRepository,
} from '../interfaces/employee-repository.interface';
import { Employee } from '../entities/employee.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { EMPLOYEE_SERVICE_TOKEN } from 'src/interfaces/employee-service.interface';
import { UserModule } from './user.module';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), UserModule, CompanyModule],
  providers: [
    { provide: EMPLOYEE_REPOSITORY_TOKEN, useClass: EmployeeRepository },
    { provide: EMPLOYEE_SERVICE_TOKEN, useClass: EmployeeService },
  ],
  controllers: [EmployeeController],
  exports: [EMPLOYEE_REPOSITORY_TOKEN],
})
export class EmployeeModule {}
