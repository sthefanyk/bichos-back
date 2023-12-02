import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { NGOAttr } from '../../@core/domain/entities/users/ngo';
import { NGOSearch } from '../../@core/application/use-cases/ngo';

export class NGOCollectionPresenter extends CollectionPresenter {
  data: NGOAttr[];

  constructor(output: NGOSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
