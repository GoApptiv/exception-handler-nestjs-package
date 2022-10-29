import {
  GaException,
  GaRestResponse,
  RestResponseErrorCode,
} from '@goapptiv/rest-response-nestjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Event } from 'src/constants/event.enum';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestExceptionFilter.name);

  constructor(private readonly eventEmitter?: EventEmitter2) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
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
        type: RestResponseErrorCode.E400_UNIDENTIFIED_BAD_REQUEST,
        message: errors,
        context: {},
      };

      errors = [exception];
    }

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.BAD_REQUEST_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(status).json(GaRestResponse.error(exception.message, errors));
  }
}
