import { Module } from '@nestjs/common';
import { PersonalityService } from './personality.service';
import { PersonalityController } from './personality.controller';
import { PersonalityProvider } from './personality.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PersonalityController],
  providers: [
    PersonalityService,
    PersonalityProvider.Repositories.PERSONALITY_TYPEORM_REPO,
    ...Object.values(PersonalityProvider.UseCases),
  ],
})
export class PersonalityModule {}
