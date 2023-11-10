import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';
import { PostTypeormRepository } from 'src/@core/infra/repositories/type-orm/post-typeorm.repository';
import { PersonalityTypeormRepository } from 'src/@core/infra/repositories/type-orm/personality-typeorm.repository';
import { BreedTypeormRepository } from 'src/@core/infra/repositories/type-orm/breed-typeorm.repository';
import {
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishAdoptPost,
  PublishSponsorshipPost,
  SearchAdoptPost,
} from 'src/@core/application/use-cases/post';
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase';
import { FindByIdAdoptPost } from 'src/@core/application/use-cases/post/find-by-id-adopt-post.usecase';
import { FindByIdSponsorshipPost } from 'src/@core/application/use-cases/post/find-by-id-sponsorship-post.usecase';
import { PostInactivate } from 'src/@core/application/use-cases/post/inactivate-adopt-post.usecase';
import { NeedTypeormRepository } from 'src/@core/infra/repositories/type-orm/need-typeorm.repository';
import { LocalizationTypeormRepository } from 'src/@core/infra/repositories/type-orm/localization-typeorm.repository';

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

    export const PERSONALITY_TYPEORM_REPO = {
      provide: 'PersonalityTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new PersonalityTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const BREED_TYPEORM_REPO = {
      provide: 'BreedTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new BreedTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const NEED_TYPEORM_REPO = {
      provide: 'NeedTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new NeedTypeormRepository(dataSource);
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
        userRepo: UserTypeormRepository,
        personalityRepo: PersonalityTypeormRepository,
        breedRepo: BreedTypeormRepository,
        localizationRepo: LocalizationTypeormRepository,
      ) => {
        return new PublishAdoptPost.Usecase(
          postRepo, 
          userRepo, 
          personalityRepo,
          breedRepo,
          localizationRepo
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
        Repositories.PERSONALITY_TYPEORM_REPO.provide,
        Repositories.BREED_TYPEORM_REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
      ],
    };

    export const PUBLISH_SPONSORSHIP_POST = {
      provide: PublishSponsorshipPost.Usecase,
      useFactory: (
        postRepo: PostTypeormRepository,
        userRepo: UserTypeormRepository,
        personalityRepo: PersonalityTypeormRepository,
        needRepo: NeedTypeormRepository,
        localizationRepo: LocalizationTypeormRepository,

      ) => {
        return new PublishSponsorshipPost.Usecase(
          postRepo, 
          userRepo, 
          personalityRepo,
          needRepo,
          localizationRepo
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
        Repositories.PERSONALITY_TYPEORM_REPO.provide,
        Repositories.NEED_TYPEORM_REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
      ],
    };

    export const FIND_ALL_ADOPT_POST = {
      provide: FindAllAdoptPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new FindAllAdoptPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_ALL_SPONSORSHIP_POST = {
      provide: FindAllSponsorshipPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new FindAllSponsorshipPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH_ADOPT_POST = {
      provide: SearchAdoptPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new SearchAdoptPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH_SPONSORSHIP_POST = {
      provide: SearchSponsorshipPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new SearchSponsorshipPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_BY_ID_ADOPT_POST = {
      provide: FindByIdAdoptPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new FindByIdAdoptPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_BY_ID_SPONSORSHIP_POST = {
      provide: FindByIdSponsorshipPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new FindByIdSponsorshipPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const INACTIVATE_POST = {
      provide: PostInactivate.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new PostInactivate.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
