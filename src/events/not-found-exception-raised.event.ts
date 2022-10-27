import { NotFoundException } from '@nestjs/common';

export class NotFoundExceptionRaised {
  req: Request;
  res: Response;
  exception: NotFoundException;
}
