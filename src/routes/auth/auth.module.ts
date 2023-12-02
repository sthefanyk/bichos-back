import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.providers';
import { ServiceAuth } from '../../@core/application/services/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ServiceAuth,
    AuthProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(AuthProvider.Services),
  ],
  exports: [AuthService, ServiceAuth],
})
export class AuthModule {}
