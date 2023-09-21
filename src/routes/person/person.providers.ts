import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { PersonTypeormRepository } from 'src/@core/infra/repositories/type-orm/person-typeorm.repository';
import {
  PersonCreate,
  PersonDelete,
  PersonFindAll,
  PersonFindById,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
  PersonSearch,
  PersonUpdate,
} from 'src/@core/application/use-cases/person';

export namespace PersonProvider {
  export namespace Repositories {
    export const PERSON_TYPEORM_REPO = {
      provide: 'PersonTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new PersonTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'PersonTypeormRepository',
      useExisting: 'PersonTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: PersonCreate.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonCreate.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: PersonFindById.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonFindById.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST = {
      provide: PersonFindAll.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonFindAll.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: PersonSearch.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonSearch.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_ACTIVATE = {
      provide: PersonGetActiveRecords.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonGetActiveRecords.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_INACTIVATE = {
      provide: PersonGetInactiveRecords.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonGetInactiveRecords.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: PersonUpdate.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonUpdate.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const DELETE = {
      provide: PersonDelete.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonDelete.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
