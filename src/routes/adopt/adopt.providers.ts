import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AdoptFindById, AdoptSearch, AdoptUsecase, ChooseAdopter, EvaluateResponses, GetAdopterByAdoptPostId } from 'src/@core/application/use-cases/adopt';
import { AdoptTypeormRepository } from 'src/@core/infra/repositories/type-orm/adopt-typeorm.repository';
import { PostTypeormRepository } from 'src/@core/infra/repositories/type-orm/post-typeorm.repository';
import { UserTypeormRepository } from 'src/@core/infra/repositories/type-orm/user-typeorm.repository';
import { QuizTypeormRepository } from 'src/@core/infra/repositories/type-orm/quiz-typeorm.repository';

export namespace AdoptProvider {
  export namespace Repositories {
    export const ADOPT_TYPEORM_REPO = {
      provide: 'AdoptTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new AdoptTypeormRepository(dataSource);
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

    export const QUIZ_TYPEORM_REPO = {
      provide: 'QuizTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new QuizTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'AdoptTypeormRepository',
      useExisting: 'AdoptTypeormRepository',
    };
  }
  export namespace UseCases {
    export const ADOPT = {
      provide: AdoptUsecase.Usecase,
      useFactory: (
        repo: AdoptTypeormRepository,
        repoPost: PostTypeormRepository,
        repoQuiz: QuizTypeormRepository,
        repoUser: UserTypeormRepository,
      ) => {
        return new AdoptUsecase.Usecase(
          repo,
          repoPost,
          repoQuiz,
          repoUser
        );
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.POST_TYPEORM_REPO.provide,
        Repositories.QUIZ_TYPEORM_REPO.provide,
        Repositories.USER_TYPEORM_REPO.provide,
      ],
    };

    export const FIND_BY_ID = {
      provide: AdoptFindById.Usecase,
      useFactory: (repo: AdoptTypeormRepository) => {
        return new AdoptFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const SEARCH = {
      provide: AdoptSearch.Usecase,
      useFactory: (repo: AdoptTypeormRepository) => {
        return new AdoptSearch.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const EVALUATE_RESPONSES = {
      provide: EvaluateResponses.Usecase,
      useFactory: (repo: AdoptTypeormRepository) => {
        return new EvaluateResponses.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const CHOOSE_ADOPTER = {
      provide: ChooseAdopter.Usecase,
      useFactory: (
        repo: AdoptTypeormRepository,
        repoPost: PostTypeormRepository
      ) => {
        return new ChooseAdopter.Usecase(repo, repoPost);
      },
      inject: [
        Repositories.REPO.provide,
        Repositories.POST_TYPEORM_REPO.provide      
      ],
    };

    export const GET_ADOPTER_BY_ADOPT_POST_ID = {
      provide: GetAdopterByAdoptPostId.Usecase,
      useFactory: (repo: AdoptTypeormRepository) => {
        return new GetAdopterByAdoptPostId.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
