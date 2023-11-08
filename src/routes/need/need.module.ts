import { Module } from '@nestjs/common';
import { NeedService } from './need.service';
import { NeedController } from './need.controller';
import { NeedProvider } from './need.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NeedController],
  providers: [NeedService,
    NeedProvider.Repositories.NEED_TYPEORM_REPO,
    ...Object.values(NeedProvider.UseCases)
  ],
})
export class NeedModule {}