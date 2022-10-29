import {
  GaException,
  GaRestResponse,
  RestResponseErrorCode,
} from '@goapptiv/rest-response-nestjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Event } from 'src/constants/event.enum';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ForbiddenExceptionFilter.name);

  constructor(private readonly eventEmitter?: EventEmitter2) {}

  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    this.logger.error(exception);
    this.logger.error({
      exception: exception['message'] || exception,
      body: req.body,
    });

    let errors = exception.getResponse()['message'] ?? exception.getResponse();

    if (typeof errors === 'string') {
      const exception: GaException = {
        type: RestResponseErrorCode.E403_FORBIDDEN,
        message: errors,
        context: {},
      };

      errors = [exception];
    }

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.FORBIDDEN_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(status).json(GaRestResponse.error(exception.message, errors));
  }
}
