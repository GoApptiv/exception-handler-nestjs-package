import { InternalServerErrorException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaInternalServerErrorException extends InternalServerErrorException {
  constructor(data: GaException[]) {
    super(data);
  }
}
