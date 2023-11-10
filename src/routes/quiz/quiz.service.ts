import { Injectable, Inject } from '@nestjs/common';
import {
  AddQuestionToQuiz,
  QuizCreate,
  QuizFindById,
  RemoveQuestionToQuiz,
} from 'src/@core/application/use-cases/quiz';

@Injectable()
export class QuizService {
  @Inject(QuizCreate.Usecase)
  private createUseCase: QuizCreate.Usecase;

  @Inject(QuizFindById.Usecase)
  private findByTitleUseCase: QuizFindById.Usecase;

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

  async addQuestion(data: AddQuestionToQuiz.Input) {
    return this.addQuestionUseCase.execute(data);
  }

  async removeQuestion(data: RemoveQuestionToQuiz.Input) {
    return this.removeQuestionUseCase.execute(data);
  }
}
