import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import {
  SponsorshipFindById,
  SponsorshipSearch,
  SponsorshipUsecase,
} from '../../@core/application/use-cases/sponsorship';
import { SponsorshipTypeormRepository } from '../../@core/infra/repositories/type-orm/sponsorship-typeorm.repository';
import { PostTypeormRepository } from '../../@core/infra/repositories/type-orm/post-typeorm.repository';
import { UserTypeormRepository } from '../../@core/infra/repositories/type-orm/user-typeorm.repository';

export namespace SponsorshipProvider {
  export namespace Repositories {
    export const ADOPT_TYPEORM_REPO = {
      provide: 'SponsorshipTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new SponsorshipTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const POST_TYPEORM_REPO = {
      provide: 'PostTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new PostTypeormRepository(dataSource);
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
      provide: 'SponsorshipTypeormRepository',
      useExisting: 'SponsorshipTypeormRepository',
    };
  }
  export namespace UseCases {
    export const ADOPT = {
      provide: SponsorshipUsecase.Usecase,
      useFactory: (
        repo: SponsorshipTypeormRepository,
        repoPost: PostTypeormRepository,
        repoUser: UserTypeormRepository,
      ) => {
        return new SponsorshipUsecase.Usecase(repo, repoPost, repoUser);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.POST_TYPEORM_REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
      ],
    };

    export const FIND_BY_ID = {
      provide: SponsorshipFindById.Usecase,
      useFactory: (repo: SponsorshipTypeormRepository) => {
        return new SponsorshipFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: SponsorshipSearch.Usecase,
      useFactory: (repo: SponsorshipTypeormRepository) => {
        return new SponsorshipSearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
