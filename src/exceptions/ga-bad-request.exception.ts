import { BadRequestException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaBadRequestException extends BadRequestException {
  constructor(data: GaException[]) {
    super(data);
  }
}
