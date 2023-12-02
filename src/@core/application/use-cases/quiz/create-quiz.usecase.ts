import UseCase from '../usecase';
import { IQuizRepository } from '../../../domain/contracts';
import { AlreadyExistsError } from '../../../shared/domain/errors/already-exists.error';
import { Quiz } from '../../../domain/entities/quiz/quiz';
import { InsertError } from '../../../shared/domain/errors/insert.error';
import { RequiredError } from '../../../shared/domain/errors/required.error';

export namespace QuizCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IQuizRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const quiz = new Quiz({
        title: input.title,
        description: input.description,
      });

      const result = await this.repo.createQuiz(quiz);
      if (!result) throw new InsertError();

      return result;
    }

    async validate(input: Input) {
      if (!input.title) throw new RequiredError('title');

      if (await this.repo.findQuizByTitle(input.title.toLowerCase()))
        throw new AlreadyExistsError('Title already exists');
    }
  }

  export type Input = {
    title: string;
    description: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
