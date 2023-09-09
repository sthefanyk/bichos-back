import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersProvider.Repositories.USER_IN_MEMORY_REPO,
    ...Object.values(UsersProvider.UseCases),
  ],
})
export class UsersModule {}
