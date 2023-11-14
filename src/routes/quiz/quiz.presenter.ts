import { QuizOutputDto } from 'src/@core/application/DTOs/quiz.dto';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchQuiz } from 'src/@core/application/use-cases/quiz/search.usecase';

export class QuizCollectionPresenter extends CollectionPresenter {
  data: QuizOutputDto[];

  constructor(output: SearchQuiz.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}