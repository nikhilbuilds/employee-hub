export abstract class ITimeOffService {
  abstract requestTimeOff(
    employeeId: string,
    categoryId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any>;
}
