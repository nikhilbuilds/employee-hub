import { TimeOffRequest } from '../entities/time-off-request.entity';

export abstract class ITimeOffRequestRepository {
  abstract createRequest(
    data: Partial<TimeOffRequest>,
  ): Promise<TimeOffRequest>;
  abstract findOverlappingRequests(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<TimeOffRequest[]>;
}
