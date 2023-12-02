import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchQuiz } from '../../@core/application/use-cases/quiz/search.usecase';
import { QuizAttr } from '../../@core/domain/entities/quiz/quiz';

export class QuizCollectionPresenter extends CollectionPresenter {
  data: QuizAttr[];

  constructor(output: SearchQuiz.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
