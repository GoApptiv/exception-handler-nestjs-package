import { ForbiddenException } from '@nestjs/common';
import { GaException } from '@goapptiv/rest-response-nestjs';
import { SystemErrors } from '@goapptiv/rest-response-nestjs/dist/constants/errors.enum';

export class GaForbiddenException extends ForbiddenException {
  constructor(data: { message?: string; context?: Record<string, any> }) {
    const exceptionData: GaException = {
      type: SystemErrors.E403_FORBIDDEN,
      message: data.message || 'Forbidden',
      context: data.context,
    };

    super(exceptionData);
  }
}
