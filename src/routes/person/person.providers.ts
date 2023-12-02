import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { PersonTypeormRepository } from '../../@core/infra/repositories/type-orm/person-typeorm.repository';
import {
  PersonCreate,
  PersonInactivate,
  PersonFindAll,
  PersonFindById,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
  PersonSearch,
  PersonUpdate,
} from '../../@core/application/use-cases/person';
import { LocalizationTypeormRepository } from '../../@core/infra/repositories/type-orm/localization-typeorm.repository';
import { PersonActivate } from '../../@core/application/use-cases/person/activate.usecase';
import { GalleryTypeormRepository } from '../../@core/infra/repositories/type-orm/gallery-typeorm.repository';
import { UserTypeormRepository } from '../../@core/infra/repositories/type-orm/user-typeorm.repository';
import { ServiceAuth } from '../../@core/application/services/auth/auth.service';

export namespace PersonProvider {
  export namespace Repositories {
    export const PERSON_TYPEORM_REPO = {
      provide: 'PersonTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new PersonTypeormRepository(dataSource);
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

    export const GALLERY_TYPEORM_REPO = {
      provide: 'GalleryTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new GalleryTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const USER_TYPEORM_REPO = {
      provide: 'UserTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource);
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
      useFactory: (
        personRepo: PersonTypeormRepository,
        localRepo: LocalizationTypeormRepository,
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new PersonCreate.Usecase(personRepo, localRepo, galleryRepo);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
      ],
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
      useFactory: (
        personRepo: PersonTypeormRepository,
        localRepo: LocalizationTypeormRepository,
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new PersonUpdate.Usecase(personRepo, localRepo, galleryRepo);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
      ],
    };

    export const INACTIVATE = {
      provide: PersonInactivate.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonInactivate.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: PersonActivate.Usecase,
      useFactory: (personRepo: PersonTypeormRepository) => {
        return new PersonActivate.Usecase(personRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }

  export namespace Services {
    export const SERVICE = {
      provide: ServiceAuth,
      useFactory: (authRepo: UserTypeormRepository) => {
        return new ServiceAuth(authRepo);
      },
      inject: [Repositories.USER_TYPEORM_REPO.provide],
    };
  }
}
