import UseCase from '../usecase';
import { IQuizRepository } from 'src/@core/domain/contracts';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';

export namespace RemoveQuestionToQuiz {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IQuizRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);
      await this.repo.removeQuestionToQuiz(input);
    }

    async validate(input: Input) {
      if (!(await this.repo.findQuestionById(input)))
        throw new NotFoundError('Question not found');
    }
  }

  export type Input = string;

  export type Output = Promise<void>;
}
