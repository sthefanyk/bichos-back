import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

import {
  UserCreate,
  UserDelete,
  UserFindAll,
  UserFindById,
  UserSearch,
  UserUpdate,
  UserGetActiveRecords,
  UserGetInactiveRecords
} from 'src/@core/application/use-cases/user';

import UserModel from 'src/@core/domain/models/user.model';

import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';

export namespace UsersProvider {
  export namespace Repositories {
    export const USER_TYPEORM_REPO = {
      provide: 'UserTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource.getRepository(UserModel));
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'UserTypeormRepository',
      useExisting: 'UserTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: UserCreate.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserCreate.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: UserFindById.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserFindById.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST = {
      provide: UserFindAll.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserFindAll.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: UserSearch.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserSearch.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_ACTIVATE = {
      provide: UserGetActiveRecords.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserGetActiveRecords.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_INACTIVATE = {
      provide: UserGetInactiveRecords.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserGetInactiveRecords.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: UserUpdate.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserUpdate.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const DELETE = {
      provide: UserDelete.Usecase,
      useFactory: (userRepo: UserTypeormRepository) => {
        return new UserDelete.Usecase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
