import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeOffRequest } from '../entities/time-off-request.entity';
import { ITimeOffRequestRepository } from '../interfaces/time-off-request-repository.interface';

@Injectable()
export class TimeOffRequestRepository implements ITimeOffRequestRepository {
  constructor(
    @InjectRepository(TimeOffRequest)
    private readonly requestRepository: Repository<TimeOffRequest>,
  ) {}

  async createRequest(data: Partial<TimeOffRequest>): Promise<TimeOffRequest> {
    const request = this.requestRepository.create(data);
    return await this.requestRepository.save(request);
  }

  async findOverlappingRequests(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<TimeOffRequest[]> {
    return await this.requestRepository
      .createQueryBuilder('request')
      .innerJoin(
        'time_off_rules',
        'rule',
        'rule.category_id = :categoryId AND rule.can_overlap_id = request.request_category_id',
        { categoryId },
      )
      .where('request.employee_id = :employeeId', { employeeId })
      .andWhere('request.start_date <= :endDate', { endDate })
      .andWhere('request.end_date >= :startDate', { startDate })
      .andWhere('rule.is_allowed = false')
      .getMany();
  }
}
