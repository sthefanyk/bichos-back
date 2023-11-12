import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchAdoptPost } from 'src/@core/application/use-cases/post';
import { AdoptPostOutputDto } from 'src/@core/application/DTOs/adopt-post.dto';

export class AdoptPostCollectionPresenter extends CollectionPresenter {
  data: AdoptPostOutputDto[];

  constructor(output: SearchAdoptPost.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items
  }
}