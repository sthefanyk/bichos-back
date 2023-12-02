import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { ShelterProvider } from './shelter.providers';
import { AuthModule } from '../auth/auth.module';
import { ServiceAuth } from 'src/@core/application/services/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [ShelterController],
  providers: [
    ShelterService,
    ServiceAuth,
    ShelterProvider.Repositories.SHELTER_TYPEORM_REPO,
    ShelterProvider.Repositories.LOCAL_TYPEORM_REPO,
    ShelterProvider.Repositories.GALLERY_TYPEORM_REPO,
    ShelterProvider.Repositories.USER_TYPEORM_REPO,
    ...Object.values(ShelterProvider.UseCases),
    ...Object.values(ShelterProvider.Services),
  ],
})
export class ShelterModule {}
