# GoApptiv Standard Exceptions NestJS

This package provides classes to throw goapptiv standard exception, also it provides exception filters to log the exception and raise an event. The event can be consumed by creating a listener.

## Installation

1. Create a `.npmrc` in the root folder and add the following lines.

```bash
//npm.pkg.github.com/:_authToken=TOKEN
@goapptiv:registry=https://npm.pkg.github.com/
```

2. Create a personal token with **read:packages** permission and replace the `TOKEN` with your personal token in the above mentioned file.

3. Install the package using the following command

```bash
npm install @goapptiv/exception-handler-nestjs
```

4. Add the following snippet in the main.ts

```ts
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
  ConflictExceptionsFilter,
  ForbiddenExceptionFilter,
  InternalServerErrorExceptionsFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
} from '@goapptiv/exception-handler-nestjs';

const eventEmitter = app.get(EventEmitter2);

// eventEmitter is optional
app.useGlobalFilters(
  new AllExceptionsFilter(eventEmitter),
  new UnauthorizedExceptionFilter(eventEmitter),
  new ForbiddenExceptionFilter(eventEmitter),
  new BadRequestExceptionFilter(eventEmitter),
  new NotFoundExceptionFilter(eventEmitter),
  new ConflictExceptionsFilter(eventEmitter),
  new InternalServerErrorExceptionsFilter(eventEmitter),
);
```

## Usage

The Following Exception comes out of the box:

1. GaBadRequestException
2. GaConflictException
3. GaNotFoundException
4. GaInternalServerErrorException

Example:

```ts
import { GaConflictException } from '@goapptiv/exception-handler-nestjs';

throw new GaConflictException([
  {
    type: 'E409_CUSTOMER_MAPPING_BRICK_ALREADY_ATTACHED_TO_HQ',
    message: `brick already attached to hqcode ${mapping.hqCode} for customer ${customer._id}, source: ${mapping.source}`,
    context: mapping,
  },
]);
```

The system will raise an event once any of the exception occurs. The different types of events can be found `GaExceptionEvent` class.
