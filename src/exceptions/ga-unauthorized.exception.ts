import { UnauthorizedException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';
import { SystemErrors } from '@goapptiv/rest-response-nestjs/dist/constants/errors.enum';

export class GaUnauthorizedException extends UnauthorizedException {
  constructor(data: { message?: string; context?: Record<string, any> }) {
    const exceptionData: GaException = {
      type: SystemErrors.E401_UNAUTHORIZED,
      message: data.message || 'Unauthorized',
      context: data.context,
    };

    super(exceptionData);
  }
}
