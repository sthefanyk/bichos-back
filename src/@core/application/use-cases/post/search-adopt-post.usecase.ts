import UseCase from '../usecase';
import {
  SearchParams as SP,
  SortDirection,
} from '../../services/search/search-params';
import {
  SearchInputDto,
  SearchOutputDto,
  SearchOutputMapper,
  SearchService,
} from '../../services/search';
import { SearchResult as SR } from '../../services/search/search-result';
import { Post } from 'src/@core/domain/entities/posts/post';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { AdoptPostOutputDto } from '../../DTOs/adopt-post.dto';

export namespace SearchAdoptPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(input: Input) : Promise<Output> {
      const posts = await this.repo.findAllAdoptPost();
      const service = new ServiceConfig(posts, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Post>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<AdoptPostOutputDto>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Post, Filter> {}
  class ServiceConfig extends SearchService<Post> {
    protected async applyFilter(
      items: Post[],
      filter: string | null,
    ): Promise<Post[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.animal.name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Post[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Post[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
