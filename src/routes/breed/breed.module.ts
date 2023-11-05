import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { BreedProvider } from './breed.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BreedController],
  providers: [BreedService,
    BreedProvider.Repositories.BREED_TYPEORM_REPO,
    ...Object.values(BreedProvider.UseCases)
  ],
})
export class BreedModule {}
