import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';
import { PostTypeormRepository } from 'src/@core/infra/repositories/type-orm/post-typeorm.repository';
import { PublishAdoptPost, PublishSponsorshipPost } from 'src/@core/application/use-cases/post';

export namespace PostProvider {
  export namespace Repositories {
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
      provide: 'PostTypeormRepository',
      useExisting: 'PostTypeormRepository',
    };
  }
  export namespace UseCases {
    export const PUBLISH_ADOPT_POST = {
      provide: PublishAdoptPost.Usecase,
      useFactory: (
        postRepo: PostTypeormRepository,
        userRepo: UserTypeormRepository
      ) => {
        return new PublishAdoptPost.Usecase(postRepo, userRepo);
      },
      inject: [Repositories.REPO.provide, Repositories.USER_TYPEORM_REPO.provide],
    };

    export const PUBLISH_SPONSORSHIP_POST = {
      provide: PublishSponsorshipPost.Usecase,
      useFactory: (
        postRepo: PostTypeormRepository,
        userRepo: UserTypeormRepository
      ) => {
        return new PublishSponsorshipPost.Usecase(postRepo, userRepo);
      },
      inject: [Repositories.REPO.provide, Repositories.USER_TYPEORM_REPO.provide],
    };
  }
}
