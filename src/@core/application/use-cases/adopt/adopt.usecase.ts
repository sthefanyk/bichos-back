import UseCase from '../usecase';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import {
  IAdoptRepository,
  IQuizRepository,
  IPostRepository,
} from 'src/@core/domain/contracts';
import { Adopt as AdoptEntity } from 'src/@core/domain/entities/adopt/adopt';
import IUserRepository from 'src/@core/domain/contracts/user-repository.interface';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { EntityValidationError } from 'src/@core/shared/domain/errors/validation.error';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import { Response } from 'src/@core/domain/entities/adopt/response';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';

export namespace AdoptUsecase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IAdoptRepository,
      private repoPost: IPostRepository,
      private repoQuiz: IQuizRepository,
      private repoUser: IUserRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const id_adopt = new UUID().id;

      const adopt = new AdoptEntity({
        id: id_adopt,
        id_adopter: input.id_adopter,
        id_post: input.id_post,
        id_quiz: input.id_quiz,
        responses: input.responses.map(r =>
          new Response({
            id_question: r.id_question,
            response: r.response,
            id_adopt
          })
        )
      });

      return await this.repo.adopt(adopt);
    }

    async validate(input: Input) {
      if (!input.id_adopter) throw new RequiredError('id_adopter');
      if (!input.id_post) throw new RequiredError('id_post');
      if (!input.id_quiz) throw new RequiredError('id_quiz');

      if (!(await this.repoPost.findByIdAdoptPost(input.id_post)))
        throw new NotFoundError('No post found');

      if (!(await this.repoQuiz.findQuizById(input.id_quiz)))
        throw new NotFoundError('No quiz found');

      if (!(await this.repoUser.findUserById(input.id_adopter)))
        throw new NotFoundError('No user found');

      await this.validateResponses(input);
    }

    async validateResponses(input: Input) {
      if (!input.responses) throw new RequiredError('responses');

      if (!(input.responses instanceof Array))
        throw new EntityValidationError('The responses is not an array');

      const quiz = await this.repoQuiz.findQuizById(input.id_quiz);
      const questions = quiz.questions;
      const processedQuestions = new Set();

      for (const response of input.responses) {
        if (!response.id_question) throw new RequiredError('id_question');
        if (!response.response) throw new RequiredError('response');

        if (!(await this.repoQuiz.findQuestionById(response.id_question)))
          throw new NotFoundError('No question found');

        if (processedQuestions.has(response.id_question)) {
          throw new AlreadyExistsError('Duplicate id_question found');
        }

        processedQuestions.add(response.id_question);

        const questionExist = questions.some(
          (q) => q.id === response.id_question,
        );
        if (!questionExist)
          throw new NotFoundError('No question found in quiz');
      }

      if (questions.length !== input.responses.length)
        throw new NotFoundError('Quiz not completely answered');
    }
  }

  export type Input = {
    id_adopter: string;
    id_post: string;
    id_quiz: string;
    responses: {
      id_question: string;
      response: string;
    }[];
  };

  export type Output = Promise<{
    id: string;
  }>;
}
