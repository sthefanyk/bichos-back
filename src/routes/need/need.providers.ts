import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import {
  NeedCreate,
  NeedFindById,
  NeedSearch,
  NeedUpdate,
  NeedActivate,
  NeedInactivate,
  NeedGetActiveRecords,
  NeedGetInactiveRecords,
} from 'src/@core/application/use-cases/need';
import { NeedTypeormRepository } from 'src/@core/infra/repositories/type-orm/need-typeorm.repository';

export namespace NeedProvider {
  export namespace Repositories {
    export const NEED_TYPEORM_REPO = {
      provide: 'NeedTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new NeedTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'NeedTypeormRepository',
      useExisting: 'NeedTypeormRepository',
    };
  }

  export namespace UseCases {
    export const CREATE = {
      provide: NeedCreate.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedCreate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: NeedFindById.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: NeedSearch.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedSearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: NeedUpdate.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedUpdate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: NeedActivate.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedActivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const INACTIVATE = {
      provide: NeedInactivate.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedInactivate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_ACTIVATE = {
      provide: NeedGetActiveRecords.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedGetActiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_INACTIVATE = {
      provide: NeedGetInactiveRecords.Usecase,
      useFactory: (repo: NeedTypeormRepository) => {
        return new NeedGetInactiveRecords.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
