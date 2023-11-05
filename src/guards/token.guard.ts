import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const token = String(authorization ?? '').split(' ')[1];

      request.token = token;

      return true;
    } catch (error) {
      return false;
    }
  }
}
