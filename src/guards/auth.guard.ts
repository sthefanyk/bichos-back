import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/@core/application/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const data = this.authService.checkTokenUser(
        String(authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      const user = await this.authService.findUserById(data.sub as any);

      request.user = user.toJson();

      return true;
    } catch (error) {
      return false;
    }
  }
}
