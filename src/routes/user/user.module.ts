import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService,
    UserProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(UserProvider.UseCases)
  ],
})
export class UserModule {}
