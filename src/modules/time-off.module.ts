import { Module } from '@nestjs/common';
import { TimeOffController } from '../controllers/time-off.controller';
import { TimeOffService } from '../services/time-off.service';
import { TimeOffPolicyEngine } from '../engines/time-off-policy-engine';
import { TimeOffRequestRepository } from '../repositories/time-off-request.repository';
import { TimeOffRulesRepository } from '../repositories/time-off-rules.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeOffRequest } from '../entities/time-off-request.entity';
import { TimeOffRule } from '../entities/time-off-rule.entity';
import { ITimeOffRequestRepository } from '../interfaces/time-off-request-repository.interface';
import { ITimeOffRulesRepository } from '../interfaces/time-off-rules-repository.interface';
import { ITimeOffPolicyEngine } from '../interfaces/time-off-policy-engine.interface';
import { RequestCategory } from 'src/entities/request-category.entity';
import { EmployeeModule } from './employee.module';
import {
  EMPLOYEE_REPOSITORY_TOKEN,
  IEmployeeRepository,
} from 'src/interfaces/employee-repository.interface';
import { EmployeeRepository } from 'src/repositories/employee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeOffRequest, TimeOffRule, RequestCategory]),
    EmployeeModule,
  ],
  controllers: [TimeOffController],
  providers: [
    TimeOffService,

    {
      provide: ITimeOffRequestRepository,
      useClass: TimeOffRequestRepository,
    },
    {
      provide: ITimeOffRulesRepository,
      useClass: TimeOffRulesRepository,
    },
    {
      provide: ITimeOffPolicyEngine,
      useClass: TimeOffPolicyEngine,
    },
  ],
})
export class TimeOffModule {}
