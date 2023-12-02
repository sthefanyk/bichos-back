import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserFindById, UserSearch } from '../../@core/application/use-cases/user';
import { UserTypeormRepository } from '../../@core/infra/repositories/type-orm/user-typeorm.repository';

export namespace UserProvider {
  export namespace Repositories {
    export const USER_TYPEORM_REPO = {
      provide: 'UserTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'UserTypeormRepository',
      useExisting: 'UserTypeormRepository',
    };
  }
  export namespace UseCases {
    export const GET = {
      provide: UserFindById.Usecase,
      useFactory: (repo: UserTypeormRepository) => {
        return new UserFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: UserSearch.Usecase,
      useFactory: (repo: UserTypeormRepository) => {
        return new UserSearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
