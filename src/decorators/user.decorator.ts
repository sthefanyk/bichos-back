import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NotFoundError } from '../@core/shared/domain/errors/not-found.error';

export const ROLES_KEY = 'roles';
export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (filter) {
        return request.user[filter];
      }

      delete request.user.password;

      return request.user;
    }

    throw new NotFoundError('User not found, use AuthGuard');
  },
);
