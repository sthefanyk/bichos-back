import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ShelterTypeormRepository } from 'src/@core/infra/repositories/type-orm/shelter-typeorm.repository';
import { LocalizationTypeormRepository } from 'src/@core/infra/repositories/type-orm/localization-typeorm.repository';
import {
  ShelterCreate,
  ShelterInactivate,
  ShelterFindAll,
  ShelterFindById,
  ShelterGetActiveRecords,
  ShelterGetInactiveRecords,
  ShelterSearch,
  ShelterUpdate,
  ShelterActivate
} from 'src/@core/application/use-cases/shelter';

export namespace ShelterProvider {
  export namespace Repositories {
    export const SHELTER_TYPEORM_REPO = {
      provide: 'ShelterTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new ShelterTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const LOCAL_TYPEORM_REPO = {
      provide: 'LocalizationTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new LocalizationTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'ShelterTypeormRepository',
      useExisting: 'ShelterTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: ShelterCreate.Usecase,
      useFactory: (
        shelterRepo: ShelterTypeormRepository,
        localRepo: LocalizationTypeormRepository,
      ) => {
        return new ShelterCreate.Usecase(shelterRepo, localRepo);
      },
      inject: [Repositories.REPO.provide, Repositories.LOCAL_TYPEORM_REPO.provide],
    };

    export const GET = {
      provide: ShelterFindById.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterFindById.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST = {
      provide: ShelterFindAll.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterFindAll.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: ShelterSearch.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterSearch.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_ACTIVATE = {
      provide: ShelterGetActiveRecords.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterGetActiveRecords.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_INACTIVATE = {
      provide: ShelterGetInactiveRecords.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterGetInactiveRecords.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: ShelterUpdate.Usecase,
      useFactory: (
        shelterRepo: ShelterTypeormRepository,
        localRepo: LocalizationTypeormRepository,
      ) => {
        return new ShelterUpdate.Usecase(shelterRepo, localRepo);
      },
      inject: [Repositories.REPO.provide, Repositories.LOCAL_TYPEORM_REPO.provide],
    };

    export const INACTIVATE = {
      provide: ShelterInactivate.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterInactivate.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: ShelterActivate.Usecase,
      useFactory: (shelterRepo: ShelterTypeormRepository) => {
        return new ShelterActivate.Usecase(shelterRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
