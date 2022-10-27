import {
  GaException,
  GaRestResponse,
  ResponseResponseErrorCode,
} from '@goapptiv/rest-response-nestjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Event } from 'src/constants/event.enum';

@Catch(ConflictException)
export class ConflictExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ConflictExceptionsFilter.name);

  constructor(private readonly eventEmitter?: EventEmitter2) {}

  catch(exception: ConflictException, host: ArgumentsHost) {
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
        type: ResponseResponseErrorCode.E409_UNIDENITIFIED_CONFLICT,
        message: errors,
        context: {},
      };

      errors = [exception];
    }

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.CONFLICT_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(status).json(GaRestResponse.error(exception.message, errors));
  }
}
