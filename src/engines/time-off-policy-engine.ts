import { BadRequestException, Injectable } from '@nestjs/common';
import { ITimeOffPolicyEngine } from '../interfaces/time-off-policy-engine.interface';
import { ITimeOffRulesRepository } from '../interfaces/time-off-rules-repository.interface';
import { ITimeOffRequestRepository } from '../interfaces/time-off-request-repository.interface';

@Injectable()
export class TimeOffPolicyEngine implements ITimeOffPolicyEngine {
  constructor(
    private readonly rulesRepository: ITimeOffRulesRepository,
    private readonly requestRepository: ITimeOffRequestRepository,
  ) {}

  async validateRequest(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const overlappingRequests =
      await this.requestRepository.findOverlappingRequests(
        employeeId,
        categoryId,
        startDate,
        endDate,
      );

    console.log({ overlappingRequests });

    if (overlappingRequests.length > 0) {
      throw new BadRequestException(
        `Request conflicts with existing time-off policies`,
      );
    }

    return;
  }
}
