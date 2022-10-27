import { ForbiddenException } from '@nestjs/common';

export class ForbiddenExceptionRaised {
  req: Request;
  res: Response;
  exception: ForbiddenException;
}
