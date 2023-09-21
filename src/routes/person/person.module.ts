import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonProvider } from './person.providers';

@Module({
  controllers: [PersonController],
  providers: [PersonService,
    PersonProvider.Repositories.PERSON_TYPEORM_REPO,
    ...Object.values(PersonProvider.UseCases)
  ],
})
export class PersonModule {}
