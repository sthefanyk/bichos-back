import { Module } from '@nestjs/common';
import { PersonalityService } from './personality.service';
import { PersonalityController } from './personality.controller';
import { PERSONALITY_PROVIDERS } from './personality.providers';

@Module({
  controllers: [PersonalityController],
  providers: [
    PersonalityService,
    PERSONALITY_PROVIDERS.REPOSITORIES.PERSONALITY_TYPEORM_REPO,
    ...Object.values(PERSONALITY_PROVIDERS.USE_CASES),
  ],
})
export class PersonalityModule {}
