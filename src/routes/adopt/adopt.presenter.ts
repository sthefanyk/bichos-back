import { AdoptOutputDto } from 'src/@core/application/DTOs/adopt.dto';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { AdoptSearch } from 'src/@core/application/use-cases/adopt/search.usecase';

export class AdoptCollectionPresenter extends CollectionPresenter {
  data: AdoptOutputDto[];

  constructor(output: AdoptSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}