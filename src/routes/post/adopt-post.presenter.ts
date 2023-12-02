import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchAdoptPost } from '../../@core/application/use-cases/post';
import { PostAttr } from '../../@core/domain/entities/posts/post';

export class AdoptPostCollectionPresenter extends CollectionPresenter {
  data: PostAttr[];

  constructor(output: SearchAdoptPost.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items;
  }
}
