import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { BreedSearch } from 'src/@core/application/use-cases/breed';
import { BreedAttr } from 'src/@core/domain/entities/breed';

export class BreedCollectionPresenter extends CollectionPresenter {
  data: BreedAttr[];

  constructor(output: BreedSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
