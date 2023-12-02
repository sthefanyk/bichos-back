import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { LocalizationTypeormRepository } from '../../@core/infra/repositories/type-orm/localization-typeorm.repository';
import {
  CityDelete,
  CityGetByName,
  CityInsert,
  GetCitiesByState,
  ListCities,
  ListStates,
  StateDelete,
  StateGetByName,
  StateInsert,
} from '../../@core/application/use-cases/localization';

export namespace LocalizationProvider {
  export namespace Repositories {
    export const LOCAL_TYPEORM_REPO = {
      provide: 'LocalizationTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new LocalizationTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'LocalizationTypeormRepository',
      useExisting: 'LocalizationTypeormRepository',
    };
  }

  export namespace UseCases {
    export const INSERT_STATE = {
      provide: StateInsert.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new StateInsert.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_STATE_BY_NAME = {
      provide: StateGetByName.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new StateGetByName.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const INSERT_CITY = {
      provide: CityInsert.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new CityInsert.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_CITIES_BY_STATE = {
      provide: GetCitiesByState.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new GetCitiesByState.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_CITY_BY_NAME = {
      provide: CityGetByName.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new CityGetByName.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_STATES = {
      provide: ListStates.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new ListStates.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST_CITIES = {
      provide: ListCities.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new ListCities.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const DELETE_CITY = {
      provide: CityDelete.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new CityDelete.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const DELETE_STATE = {
      provide: StateDelete.Usecase,
      useFactory: (repo: LocalizationTypeormRepository) => {
        return new StateDelete.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
