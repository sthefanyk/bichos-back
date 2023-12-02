import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonProvider } from './person.providers';
import { AuthModule } from '../auth/auth.module';
import { AuthService as Service } from 'src/@core/application/services/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [PersonController],
  providers: [
    PersonService,
    Service,
    PersonProvider.Repositories.PERSON_TYPEORM_REPO,
    PersonProvider.Repositories.LOCAL_TYPEORM_REPO,
    PersonProvider.Repositories.USER_TYPEORM_REPO,
    PersonProvider.Repositories.GALLERY_TYPEORM_REPO,
    ...Object.values(PersonProvider.UseCases),
    ...Object.values(PersonProvider.Services),
  ],
})
export class PersonModule {}
