import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';
import { PostTypeormRepository } from 'src/@core/infra/repositories/type-orm/post-typeorm.repository';
import { PublishPost } from 'src/@core/application/use-cases/post/publish-post.usecase';

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
    export const CREATE = {
      provide: PublishPost.Usecase,
      useFactory: (
        postRepo: PostTypeormRepository,
        userRepo: UserTypeormRepository
      ) => {
        return new PublishPost.Usecase(postRepo, userRepo);
      },
      inject: [Repositories.REPO.provide, Repositories.USER_TYPEORM_REPO.provide],
    };
  }
}
