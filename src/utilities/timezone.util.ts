import { BadRequestException } from '@nestjs/common';

export function convertUTCToLocal(utcDateString) {
  const utcDate = new Date(utcDateString);

  if (isNaN(utcDate.getTime())) {
    throw new BadRequestException('Invalid UTC date string');
  }

  const localOffset = utcDate.getTimezoneOffset();

  const localDate = new Date(utcDate.getTime() - localOffset * 60 * 1000);

  return localDate;
}
