import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { PersonAttr } from "src/@core/domain/entities/users/person";
import { PersonSearch } from "src/@core/application/use-cases/person";

export class PersonCollectionPresenter extends CollectionPresenter {
  data: PersonAttr[];

  constructor(output: PersonSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}