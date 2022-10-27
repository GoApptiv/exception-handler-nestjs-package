import { NotFoundException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaNotFoundException extends NotFoundException {
  constructor(data: GaException[]) {
    super(data);
  }
}
