import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import {
  PersonalityCreate,
  PersonalityFindById,
  PersonalitySearch,
  PersonalityUpdate,
  PersonalityActivate,
  PersonalityInactivate,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords,
} from '../../@core/application/use-cases/personality';
import { PersonalityTypeormRepository } from '../../@core/infra/repositories/type-orm/personality-typeorm.repository';

export namespace PersonalityProvider {
  export namespace Repositories {
    export const PERSONALITY_TYPEORM_REPO = {
      provide: 'PersonalityTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new PersonalityTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'PersonalityTypeormRepository',
      useExisting: 'PersonalityTypeormRepository',
    };
  }

  export namespace UseCases {
    export const CREATE = {
      provide: PersonalityCreate.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityCreate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: PersonalityFindById.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: PersonalitySearch.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalitySearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: PersonalityUpdate.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityUpdate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: PersonalityActivate.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityActivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const INACTIVATE = {
      provide: PersonalityInactivate.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityInactivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_ACTIVATE = {
      provide: PersonalityGetActiveRecords.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityGetActiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_INACTIVATE = {
      provide: PersonalityGetInactiveRecords.Usecase,
      useFactory: (repo: PersonalityTypeormRepository) => {
        return new PersonalityGetInactiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
