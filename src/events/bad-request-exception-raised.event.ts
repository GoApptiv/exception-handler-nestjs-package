import { BadRequestException } from '@nestjs/common';

export class BadRequestExceptionRaised {
  req: Request;
  res: Response;
  exception: BadRequestException;
}
