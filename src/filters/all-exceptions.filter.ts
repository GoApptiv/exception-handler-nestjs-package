import {
  GaRestResponse,
  RestResponseErrorCode,
} from '@goapptiv/rest-response-nestjs';
import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseExceptionFilter } from '@nestjs/core';
import { Event } from 'src/constants/event.enum';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly eventEmitter?: EventEmitter2) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    // Request context
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    this.logger.error(exception);
    this.logger.error({
      exception: exception['message'] || exception,
      message: 'Internal server error',
      body: req.body,
    });

    if (this.eventEmitter) {
      this.eventEmitter.emit(Event.UNIDENTIFIED_EXCEPTION, {
        req,
        res,
        exception,
      });
    }

    res.status(500).json(
      GaRestResponse.error('Internal Server Error', [
        {
          type: RestResponseErrorCode.E500_UNIDENTIFIED_INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          context: {},
        },
      ]),
    );
  }
}
