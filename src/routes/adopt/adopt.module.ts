import { Module } from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { AdoptController } from './adopt.controller';
import { AdoptProvider } from './adopt.providers';
import { AuthModule } from '../auth/auth.module';
import { SocketModule } from '../../socket/socket.module';
import { SocketService } from '../../socket/socket.service';

@Module({
  imports: [AuthModule, SocketModule],
  controllers: [AdoptController],
  providers: [
    AdoptService, SocketService,
    AdoptProvider.Repositories.ADOPT_TYPEORM_REPO,
    AdoptProvider.Repositories.POST_TYPEORM_REPO,
    AdoptProvider.Repositories.QUIZ_TYPEORM_REPO,
    AdoptProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(AdoptProvider.UseCases),
  ],
})
export class AdoptModule {}
