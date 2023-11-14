import { SponsorshipOutputDto } from 'src/@core/application/DTOs/sponsorship.dto';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SponsorshipSearch } from 'src/@core/application/use-cases/sponsorship/search.usecase';

export class SponsorshipCollectionPresenter extends CollectionPresenter {
  data: SponsorshipOutputDto[];

  constructor(output: SponsorshipSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}