import { NeedAttr } from 'src/@core/domain/entities/need';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { NeedSearch } from 'src/@core/application/use-cases/need';

export class NeedCollectionPresenter extends CollectionPresenter {
  data: NeedAttr[];

  constructor(output: NeedSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
