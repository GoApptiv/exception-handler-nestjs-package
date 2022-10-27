import { ConflictException } from '@nestjs/common';

export class ConflictExceptionRaised {
  req: Request;
  res: Response;
  exception: ConflictException;
}
