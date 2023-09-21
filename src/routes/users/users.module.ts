import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.providers';
// import { AuthModule } from '../auth/auth.module';

@Module({
  // imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersProvider.Repositories.PERSON_TYPEORM_REPO,
    ...Object.values(UsersProvider.UseCases)
  ],
  exports: [UsersService]
})
export class UsersModule {}
