import { BadRequestException } from '@nestjs/common';

export function convertUTCToLocal(utcDate) {
  if (isNaN(utcDate.getTime())) {
    throw new BadRequestException('Invalid UTC date string');
  }

  const localOffset = utcDate.getTimezoneOffset();

  let localDate = new Date(utcDate.getTime() - localOffset * 60 * 1000);

  return localDate;
}
