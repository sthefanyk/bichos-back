import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import {
  BreedActivate,
  BreedCreate,
  BreedFindById,
  BreedFindBySpecie,
  BreedGetActiveRecords,
  BreedGetInactiveRecords,
  BreedInactivate,
  BreedSearch,
  BreedUpdate,
} from '../../@core/application/use-cases/breed';
import { BreedTypeormRepository } from '../../@core/infra/repositories/type-orm/breed-typeorm.repository';

export namespace BreedProvider {
  export namespace Repositories {
    export const BREED_TYPEORM_REPO = {
      provide: 'BreedTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new BreedTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'BreedTypeormRepository',
      useExisting: 'BreedTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: BreedCreate.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedCreate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: BreedFindById.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: BreedSearch.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedSearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: BreedUpdate.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedUpdate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: BreedActivate.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedActivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const INACTIVATE = {
      provide: BreedInactivate.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedInactivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_ACTIVATE = {
      provide: BreedGetActiveRecords.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedGetActiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_INACTIVATE = {
      provide: BreedGetInactiveRecords.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedGetInactiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_BY_SPECIE = {
      provide: BreedFindBySpecie.Usecase,
      useFactory: (repo: BreedTypeormRepository) => {
        return new BreedFindBySpecie.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
