import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { QuizTypeormRepository } from 'src/@core/infra/repositories/type-orm/quiz-typeorm.repository';
import { AddQuestionToQuiz, QuizCreate, QuizFindById, RemoveQuestionToQuiz } from 'src/@core/application/use-cases/quiz';
import { SearchQuiz } from 'src/@core/application/use-cases/quiz/search.usecase';

export namespace QuizProvider {
  export namespace Repositories {
    export const QUIZ_TYPEORM_REPO = {
      provide: 'QuizTypeormRepository',
      useFactory: (dataSource: DataSource) => {
        return new QuizTypeormRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    };

    export const REPO = {
      provide: 'QuizTypeormRepository',
      useExisting: 'QuizTypeormRepository',
    };
  }
  export namespace UseCases {
    export const CREATE = {
      provide: QuizCreate.Usecase,
      useFactory: (repo: QuizTypeormRepository) => {
        return new QuizCreate.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_BY_ID = {
      provide: QuizFindById.Usecase,
      useFactory: (repo: QuizTypeormRepository) => {
        return new QuizFindById.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const FIND_ALL_QUIZ = {
      provide: SearchQuiz.Usecase,
      useFactory: (repo: QuizTypeormRepository) => {
        return new SearchQuiz.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const ADD_QUESTION = {
      provide: AddQuestionToQuiz.Usecase,
      useFactory: (repo: QuizTypeormRepository) => {
        return new AddQuestionToQuiz.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const REMOVE_QUESTION = {
      provide: RemoveQuestionToQuiz.Usecase,
      useFactory: (repo: QuizTypeormRepository) => {
        return new RemoveQuestionToQuiz.Usecase(repo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
