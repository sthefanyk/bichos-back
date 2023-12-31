import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { AdoptSearch } from '../../@core/application/use-cases/adopt/search.usecase';
import { AdoptAttr } from '../../@core/domain/entities/adopt/adopt';

export class AdoptCollectionPresenter extends CollectionPresenter {
  data: AdoptAttr[];

  constructor(output: AdoptSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
