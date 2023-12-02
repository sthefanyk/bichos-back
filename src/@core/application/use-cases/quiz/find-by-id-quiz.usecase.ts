import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IQuizRepository } from '../../../domain/contracts';
import { Quiz } from '../../../domain/entities/quiz/quiz';

export namespace QuizFindById {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IQuizRepository) {}

    async execute(input: Input): Output {
      const quiz = await this.repo.findQuizById(input.id);

      if (!quiz) {
        throw new NotFoundError('Quiz not found');
      }

      return quiz;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Quiz>;
}
