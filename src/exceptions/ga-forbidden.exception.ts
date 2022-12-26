import { ForbiddenException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaForbiddenException extends ForbiddenException {
  constructor(data: GaException[]) {
    super(data);
  }
}
