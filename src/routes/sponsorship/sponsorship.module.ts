import { Module } from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { SponsorshipController } from './sponsorship.controller';
import { SponsorshipProvider } from './sponsorship.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SponsorshipController],
  providers: [SponsorshipService,
    SponsorshipProvider.Repositories.ADOPT_TYPEORM_REPO,
    SponsorshipProvider.Repositories.POST_TYPEORM_REPO,
    SponsorshipProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(SponsorshipProvider.UseCases)
  ],
})
export class SponsorshipModule {}
