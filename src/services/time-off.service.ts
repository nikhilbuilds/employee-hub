import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ITimeOffPolicyEngine } from '../interfaces/time-off-policy-engine.interface';
import { ITimeOffRequestRepository } from '../interfaces/time-off-request-repository.interface';
import { Repository } from 'typeorm';
import { RequestCategory } from 'src/entities/request-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EMPLOYEE_REPOSITORY_TOKEN,
  IEmployeeRepository,
} from 'src/interfaces/employee-repository.interface';

@Injectable()
export class TimeOffService {
  private readonly logger = new Logger(TimeOffService.name); // Logger instance with class name

  constructor(
    private readonly policyEngine: ITimeOffPolicyEngine,
    private readonly requestRepository: ITimeOffRequestRepository,

    @Inject(EMPLOYEE_REPOSITORY_TOKEN)
    private readonly employeeRepository: IEmployeeRepository,

    @InjectRepository(RequestCategory)
    private readonly categoryRepository: Repository<RequestCategory>,
  ) {}

  async requestTimeOff(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    const employee = await this.employeeRepository.findOneById(employeeId);

    if (!employee) {
      this.logger.warn(`Invalid Employee ID - ${employeeId}`);

      throw new BadRequestException(`Invalid Employee ID`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      this.logger.warn(`Category with ID ${categoryId} does not exist`);

      throw new NotFoundException(
        `Category with ID ${categoryId} does not exist`,
      );
    }

    await this.policyEngine.validateRequest(
      employee.employeeId,
      category.id,
      startDate,
      endDate,
    );

    const createRequest = await this.requestRepository.createRequest({
      employeeId: employee,
      requestCategory: category,
      startDate,
      endDate,
    });

    this.logger.log({ createRequest });
    return createRequest;
  }
}
