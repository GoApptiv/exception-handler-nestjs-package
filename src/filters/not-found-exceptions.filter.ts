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
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Event } from 'src/constants/event.enum';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundExceptionFilter.name);

  constructor(private readonly eventEmitter?: EventEmitter2) {}

  catch(exception: NotFoundException, host: ArgumentsHost) {
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
        type: RestResponseErrorCode.E404_UNIDENTIFIED_NOT_FOUND,
        message: errors,
        context: {},
      };

      errors = [exception];
    }

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.NOT_FOUND_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(status).json(GaRestResponse.error(exception.message, errors));
  }
}
