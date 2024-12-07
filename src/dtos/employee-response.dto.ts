export class EmployeeResponseDto {
  id: string;
  name: string;
  position: string;
  email: string;
  salary: number;
  createdAt: Date;
  modifiedAt: Date;
}

export class EmployeeListResponseDto {
  employees: EmployeeResponseDto[];
}
