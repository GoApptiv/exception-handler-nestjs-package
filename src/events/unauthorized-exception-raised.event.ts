import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedExceptionRaised {
  req: Request;
  res: Response;
  exception: UnauthorizedException;
}
