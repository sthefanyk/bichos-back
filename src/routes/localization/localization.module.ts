import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { LocalizationProvider } from './localization.providers';

@Module({
  controllers: [LocalizationController],
  providers: [LocalizationService,
    LocalizationProvider.Repositories.LOCAL_TYPEORM_REPO,
    ...Object.values(LocalizationProvider.UseCases)
  ],
})
export class LocalizationModule {}
