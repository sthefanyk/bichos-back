import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.providers';
import { AuthService as Service} from 'src/@core/application/services/auth/auth.service';

@Module({
  // imports: [forwardRef(() =>UsersModule), Service],
  controllers: [AuthController],
  providers: [
    AuthService,
    Service,
    AuthProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(AuthProvider.Services)
  ],
  exports: [AuthService, Service]
})
export class AuthModule {}
