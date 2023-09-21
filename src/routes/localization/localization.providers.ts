import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { LocalizationTypeormRepository } from 'src/@core/infra/repositories/type-orm/localization-typeorm.repository';
import { StateInsert } from 'src/@core/application/use-cases/localization/insert-state.usecase';
import { StateGetByName } from 'src/@core/application/use-cases/localization/get-state-by-name.usecase';
import { CityInsert } from 'src/@core/application/use-cases/localization/insert-city.usecase';

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
  }
}
