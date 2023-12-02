import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { UserSearch } from 'src/@core/application/use-cases/user';
import { UserAttr } from 'src/@core/domain/entities';

export class UserCollectionPresenter extends CollectionPresenter {
  data: UserAttr[];

  constructor(output: UserSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
