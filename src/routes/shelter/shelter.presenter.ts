import { ShelterAttr } from 'src/@core/domain/entities/users/shelter';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { ShelterSearch } from 'src/@core/application/use-cases/shelter';

export class ShelterCollectionPresenter extends CollectionPresenter {
  data: ShelterAttr[];

  constructor(output: ShelterSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
