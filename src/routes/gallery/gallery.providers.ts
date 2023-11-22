import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { GalleryTypeormRepository } from 'src/@core/infra/repositories/type-orm/gallery-typeorm.repository';
import { GalleryInsertImageUseCase } from 'src/@core/application/use-cases/gallery';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';

export namespace GalleryProvider {
  export namespace Repositories {
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
      provide: 'GalleryTypeormRepository',
      useExisting: 'GalleryTypeormRepository',
    };
  }
  export namespace UseCases {
    export const INSERT_IMAGE = {
      provide: GalleryInsertImageUseCase.Usecase,
      useFactory: (
        repo: GalleryTypeormRepository,
        repoUser: UserTypeormRepository
      ) => {
        return new GalleryInsertImageUseCase.Usecase(
          repo,
          repoUser
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide
      ],
    };
  }
}
