import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { NGOTypeormRepository } from 'src/@core/infra/repositories/type-orm/ngo-typeorm.repository';
import {
  NGOCreate,
  NGOInactivate,
  NGOFindAll,
  NGOFindById,
  NGOGetActiveRecords,
  NGOGetInactiveRecords,
  NGOSearch,
  NGOUpdate,
} from 'src/@core/application/use-cases/ngo';
import { LocalizationTypeormRepository } from 'src/@core/infra/repositories/type-orm/localization-typeorm.repository';
import { NGOActivate } from 'src/@core/application/use-cases/ngo/activate.usecase';
import { GalleryTypeormRepository } from 'src/@core/infra/repositories/type-orm/gallery-typeorm.repository';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';
import { ServiceAuth } from '../../@core/application/services/auth/auth.service';

export namespace NGOProvider {
  export namespace Repositories {
    export const PERSON_TYPEORM_REPO = {
      provide: 'NGOTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new NGOTypeormRepository(dataSource);
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
      provide: 'NGOTypeormRepository',
      useExisting: 'NGOTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: NGOCreate.Usecase,
      useFactory: (
        ngoRepo: NGOTypeormRepository,
        localRepo: LocalizationTypeormRepository,
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new NGOCreate.Usecase(ngoRepo, localRepo, galleryRepo);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
      ],
    };

    export const GET = {
      provide: NGOFindById.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOFindById.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST = {
      provide: NGOFindAll.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOFindAll.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: NGOSearch.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOSearch.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_ACTIVATE = {
      provide: NGOGetActiveRecords.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOGetActiveRecords.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_INACTIVATE = {
      provide: NGOGetInactiveRecords.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOGetInactiveRecords.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: NGOUpdate.Usecase,
      useFactory: (
        ngoRepo: NGOTypeormRepository,
        localRepo: LocalizationTypeormRepository,
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new NGOUpdate.Usecase(ngoRepo, localRepo, galleryRepo);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
      ],
    };

    export const INACTIVATE = {
      provide: NGOInactivate.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOInactivate.Usecase(ngoRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ACTIVATE = {
      provide: NGOActivate.Usecase,
      useFactory: (ngoRepo: NGOTypeormRepository) => {
        return new NGOActivate.Usecase(ngoRepo);
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
