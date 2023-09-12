import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/user/infra/repository/typeorm/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(UsersProvider.UseCases),
  ],
})
export class UsersModule {}
