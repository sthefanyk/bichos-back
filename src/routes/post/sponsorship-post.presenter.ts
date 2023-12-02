import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchSponsorshipPost } from '../../@core/application/use-cases/post/search-sponsorship-post.usecase';
import { PostAttr } from '../../@core/domain/entities/posts/post';

export class SponsorshipPostCollectionPresenter extends CollectionPresenter {
  data: PostAttr[];

  constructor(output: SearchSponsorshipPost.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
