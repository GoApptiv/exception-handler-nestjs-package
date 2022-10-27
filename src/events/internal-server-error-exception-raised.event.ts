import { InternalServerErrorException } from '@nestjs/common';

export class InternalServerErrorExceptionRaised {
  req: Request;
  res: Response;
  exception: InternalServerErrorException;
}
