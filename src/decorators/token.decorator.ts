import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NotFoundError } from '../@core/shared/domain/errors/not-found.error';

export const Token = createParamDecorator(
  (_: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.token) {
      return request.token;
    }

    throw new NotFoundError('Token not found, use TokenGuard');
  },
);
