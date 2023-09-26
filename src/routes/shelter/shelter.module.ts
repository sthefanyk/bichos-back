import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { ShelterProvider } from './shelter.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ShelterController],
  providers: [ShelterService,
    ShelterProvider.Repositories.SHELTER_TYPEORM_REPO,
    ShelterProvider.Repositories.LOCAL_TYPEORM_REPO,
    ...Object.values(ShelterProvider.UseCases)],
})
export class ShelterModule {}
