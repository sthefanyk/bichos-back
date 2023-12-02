import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ServiceAuth } from '../../@core/application/services/auth/auth.service';

import { UserTypeormRepository } from '../../@core/infra/repositories/type-orm/user-typeorm.repository';

export namespace AuthProvider {
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

  export namespace Services {
    export const SERVICE = {
      provide: ServiceAuth,
      useFactory: (authRepo: UserTypeormRepository) => {
        return new ServiceAuth(authRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
