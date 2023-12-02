import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SponsorshipSearch } from '../../@core/application/use-cases/sponsorship/search.usecase';
import { SponsorshipAttr } from '../../@core/domain/entities/sponsorship/sponsorship';

export class SponsorshipCollectionPresenter extends CollectionPresenter {
  data: SponsorshipAttr[];

  constructor(output: SponsorshipSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
