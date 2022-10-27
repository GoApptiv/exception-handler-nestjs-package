import { ConflictException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaConflictException extends ConflictException {
  constructor(data: GaException[]) {
    super(data);
  }
}
