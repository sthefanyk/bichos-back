import { Module } from '@nestjs/common';
import { NGOService } from './ngo.service';
import { NGOController } from './ngo.controller';
import { NGOProvider } from './ngo.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NGOController],
  providers: [NGOService,
    NGOProvider.Repositories.PERSON_TYPEORM_REPO,
    NGOProvider.Repositories.LOCAL_TYPEORM_REPO,
    NGOProvider.Repositories.GALLERY_TYPEORM_REPO,
    ...Object.values(NGOProvider.UseCases)
  ],
})
export class NGOModule {}
