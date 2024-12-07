export abstract class ITimeOffPolicyEngine {
  abstract validateRequest(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<void>;
}
