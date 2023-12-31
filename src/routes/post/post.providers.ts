import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserTypeormRepository } from '../../@core/infra/repositories/type-orm/user-typeorm.repository';
import { PostTypeormRepository } from '../../@core/infra/repositories/type-orm/post-typeorm.repository';
import { PersonalityTypeormRepository } from '../../@core/infra/repositories/type-orm/personality-typeorm.repository';
import { BreedTypeormRepository } from '../../@core/infra/repositories/type-orm/breed-typeorm.repository';
import {
  CheckAndUpdateStatusSponsorshipPost,
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishAdoptPost,
  PublishSponsorshipPost,
  SearchAdoptPost,
} from '../../@core/application/use-cases/post';
import { SearchSponsorshipPost } from '../../@core/application/use-cases/post/search-sponsorship-post.usecase';
import { FindByIdAdoptPost } from '../../@core/application/use-cases/post/find-by-id-adopt-post.usecase';
import { FindByIdSponsorshipPost } from '../../@core/application/use-cases/post/find-by-id-sponsorship-post.usecase';
import { PostInactivate } from '../../@core/application/use-cases/post/inactivate-adopt-post.usecase';
import { NeedTypeormRepository } from '../../@core/infra/repositories/type-orm/need-typeorm.repository';
import { LocalizationTypeormRepository } from '../../@core/infra/repositories/type-orm/localization-typeorm.repository';
import { CheckAndUpdateStatusAdoptPost } from '../../@core/application/use-cases/post/check-and-update-status-adopt-post.usecase';
import { GalleryTypeormRepository } from '../../@core/infra/repositories/type-orm/gallery-typeorm.repository';

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

    export const GALLERY_TYPEORM_REPO = {
      provide: 'GalleryTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new GalleryTypeormRepository(dataSource);
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
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new PublishAdoptPost.Usecase(
          postRepo,
          userRepo,
          personalityRepo,
          breedRepo,
          localizationRepo,
          galleryRepo,
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
        Repositories.PERSONALITY_TYPEORM_REPO.provide,
        Repositories.BREED_TYPEORM_REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
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
        galleryRepo: GalleryTypeormRepository,
      ) => {
        return new PublishSponsorshipPost.Usecase(
          postRepo,
          userRepo,
          personalityRepo,
          needRepo,
          localizationRepo,
          galleryRepo,
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
        Repositories.PERSONALITY_TYPEORM_REPO.provide,
        Repositories.NEED_TYPEORM_REPO.provide,
        Repositories.LOCAL_TYPEORM_REPO.provide,
        Repositories.GALLERY_TYPEORM_REPO.provide,
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

    export const CHECK_AND_UPDATE_STATUS_ADOPT_POST = {
      provide: CheckAndUpdateStatusAdoptPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new CheckAndUpdateStatusAdoptPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const CHECK_AND_UPDATE_STATUS_SPONSORSHIP_POST = {
      provide: CheckAndUpdateStatusSponsorshipPost.Usecase,
      useFactory: (postRepo: PostTypeormRepository) => {
        return new CheckAndUpdateStatusSponsorshipPost.Usecase(postRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
