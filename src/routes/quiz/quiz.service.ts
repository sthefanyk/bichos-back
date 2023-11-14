import { Injectable, Inject } from '@nestjs/common';
import {
  AddQuestionToQuiz,
  QuizCreate,
  QuizFindById,
  RemoveQuestionToQuiz,
} from 'src/@core/application/use-cases/quiz';
import { SearchQuiz } from 'src/@core/application/use-cases/quiz/search.usecase';
import { QuizCollectionPresenter } from './quiz.presenter';

@Injectable()
export class QuizService {
  @Inject(QuizCreate.Usecase)
  private createUseCase: QuizCreate.Usecase;

  @Inject(QuizFindById.Usecase)
  private findByTitleUseCase: QuizFindById.Usecase;

  @Inject(SearchQuiz.Usecase)
  private quizSearchUseCase: SearchQuiz.Usecase;

  @Inject(AddQuestionToQuiz.Usecase)
  private addQuestionUseCase: AddQuestionToQuiz.Usecase;

  @Inject(RemoveQuestionToQuiz.Usecase)
  private removeQuestionUseCase: RemoveQuestionToQuiz.Usecase;

  async create(data: QuizCreate.Input) {
    return this.createUseCase.execute(data);
  }

  async findById(data: QuizFindById.Input) {
    const quiz =  await this.findByTitleUseCase.execute(data);
    return quiz.toJson();
  }

  async searchQuiz(searchParams: SearchQuiz.Input) {
    const output = await this.quizSearchUseCase.execute(searchParams);
    return new QuizCollectionPresenter(output);
  }

  async addQuestion(data: AddQuestionToQuiz.Input) {
    return this.addQuestionUseCase.execute(data);
  }

  async removeQuestion(data: RemoveQuestionToQuiz.Input) {
    return this.removeQuestionUseCase.execute(data);
  }
}
