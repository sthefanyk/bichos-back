import { SponsorshipPostOutputDto } from 'src/@core/application/DTOs/sponsorship-post.dto';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase';

export class SponsorshipPostCollectionPresenter extends CollectionPresenter {
  data: SponsorshipPostOutputDto[];

  constructor(output: SearchSponsorshipPost.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}
