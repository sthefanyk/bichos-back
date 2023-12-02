import UseCase from '../usecase';
import { IQuizRepository } from '../../../domain/contracts';
import { Question } from '../../../domain/entities/quiz/question';
import { Alternative } from '../../../domain/entities/quiz/alternative';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export namespace AddQuestionToQuiz {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IQuizRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const alternatives = input.question.alternatives.map(
        (a) => new Alternative({ alternative: a }),
      );

      const question = new Question({
        question: input.question.question,
        type: input.question.type,
        others: input.question.others,
        alternatives,
      });

      await this.repo.addQuestionToQuiz(input.id_quiz, question);
    }

    async validate(input: Input) {
      if (!input.id_quiz) throw new RequiredError('id_quiz');

      if (!(await this.repo.findQuizById(input.id_quiz)))
        throw new NotFoundError('Quiz not found');
    }
  }

  export type Input = {
    id_quiz: string;
    question: {
      question: string;
      type: number;
      others: boolean;
      alternatives: string[];
    };
  };

  export type Output = Promise<void>;
}
