import { PersonalityAttr } from 'src/@core/domain/entities/personality';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { PersonalitySearch } from 'src/@core/application/use-cases/personality';

export class PersonalityCollectionPresenter extends CollectionPresenter {
  data: PersonalityAttr[];

  constructor(output: PersonalitySearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
