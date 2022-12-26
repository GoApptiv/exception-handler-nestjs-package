import { UnauthorizedException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';

export class GaUnauthorizedException extends UnauthorizedException {
  constructor(data: GaException[]) {
    super(data);
  }
}
