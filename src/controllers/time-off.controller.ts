import { Controller, Post, Body } from '@nestjs/common';
import { TimeOffService } from '../services/time-off.service';
import { CreateTimeOffRequestDto } from 'src/dtos/time-off-request.dto';

@Controller('time-off')
export class TimeOffController {
  constructor(private readonly timeOffService: TimeOffService) {}

  @Post('request')
  async requestTimeOff(@Body() body: CreateTimeOffRequestDto): Promise<any> {
    const { employeeId, categoryId, startDate, endDate } = body;
    return await this.timeOffService.requestTimeOff(
      employeeId,
      categoryId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
