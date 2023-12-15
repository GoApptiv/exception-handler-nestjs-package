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
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Event } from 'src/constants/event.enum';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(
    InternalServerErrorExceptionsFilter.name,
  );

  constructor(private readonly eventEmitter?: EventEmitter2) {}

  catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
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
        type: RestResponseErrorCode.E500_UNIDENTIFIED_INTERNAL_SERVER_ERROR,
        message: errors,
        context: {},
      };

      errors = [exception];
    }

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.INTERNAL_SERVER_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(status).json(GaRestResponse.error(exception.message, errors));
  }
}
