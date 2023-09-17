import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

import {
  PersonalityCreate,
  PersonalityDelete,
  PersonalityFindAll,
  PersonalityFindById,
  PersonalitySearch,
  PersonalityUpdate,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords
} from 'src/@core/application/use-cases/personality';
import { PersonalityTypeormRepository } from 'src/@core/infra/repositories/type-orm/personality-typeorm.repository';
import PersonalityModel from 'src/@core/domain/models/personality.model';

export namespace PERSONALITY_PROVIDERS {
  export namespace REPOSITORIES {
    export const PERSONALITY_TYPEORM_REPO = {
      provide: 'PersonalityTypeormRepository',
      useFactory: (dataSource: DataSource) =>{
        return new PersonalityTypeormRepository(dataSource.getRepository(PersonalityModel));
      },
      inject: [getDataSourceToken()]
    };

    export const REPO = {
      provide: 'PersonalityTypeormRepository',
      useExisting: 'PersonalityTypeormRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE = {
      provide: PersonalityCreate.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityCreate.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const GET = {
      provide: PersonalityFindById.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityFindById.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const LIST = {
      provide: PersonalityFindAll.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityFindAll.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const SEARCH = {
      provide: PersonalitySearch.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalitySearch.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const GET_ACTIVATE = {
      provide: PersonalityGetActiveRecords.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityGetActiveRecords.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const GET_INACTIVATE = {
      provide: PersonalityGetInactiveRecords.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityGetInactiveRecords.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const UPDATE = {
      provide: PersonalityUpdate.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityUpdate.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };

    export const DELETE = {
      provide: PersonalityDelete.Usecase,
      useFactory: (userRepo: PersonalityTypeormRepository) => {
        return new PersonalityDelete.Usecase(userRepo);
      },
      inject: [REPOSITORIES.REPO.provide],
    };
  }
}
