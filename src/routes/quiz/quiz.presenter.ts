import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchQuiz } from 'src/@core/application/use-cases/quiz/search.usecase';
import { QuizAttr } from 'src/@core/domain/entities/quiz/quiz';

export class QuizCollectionPresenter extends CollectionPresenter {
  data: QuizAttr[];

  constructor(output: SearchQuiz.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}