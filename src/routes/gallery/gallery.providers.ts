import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { GalleryTypeormRepository } from '../../@core/infra/repositories/type-orm/gallery-typeorm.repository';
import {
  GalleryGetImageUrlUseCase,
  GalleryInsertImageUseCase,
  GalleryRemoveImageUseCase,
} from '../../@core/application/use-cases/gallery';

export namespace GalleryProvider {
  export namespace Repositories {
    export const GALLERY_TYPEORM_REPO = {
      provide: 'GalleryTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new GalleryTypeormRepository(dataSource);
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
      useFactory: (repo: GalleryTypeormRepository) => {
        return new GalleryInsertImageUseCase.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET_IMAGE_URL = {
      provide: GalleryGetImageUrlUseCase.Usecase,
      useFactory: (repo: GalleryTypeormRepository) => {
        return new GalleryGetImageUrlUseCase.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const REMOVE_IMAGE = {
      provide: GalleryRemoveImageUseCase.Usecase,
      useFactory: (repo: GalleryTypeormRepository) => {
        return new GalleryRemoveImageUseCase.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
