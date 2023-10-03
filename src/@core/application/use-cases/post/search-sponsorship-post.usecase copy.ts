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
import { AnimalSponsorshipMapper } from 'src/@core/domain/mappers/animal-sponsorship.mapper';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { UUID } from 'crypto';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import { StatusPost } from 'src/@core/shared/domain/enums/status_post.enum';
import { SexAnimal } from 'src/@core/shared/domain/enums/sex-animal';
import { Species } from 'src/@core/shared/domain/enums/species.enum';

export namespace SearchSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(input: Input) : Promise<Output> {
      const posts = await this.repo.findAllSponsorshipPost();
      const service = new ServiceConfig(posts, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output | any {
      return {
        items: searchResult.items.map((i) => AnimalSponsorshipMapper.getJsonWithEntity(i)),
        ...SearchOutputMapper.toOutput<Post>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<{
    id: string,
    urgent: boolean;
    posted_by: UUID;
    renewal_count: number;
    status: StatusPost;
    type: TypePost;
    urgency_justification: string;
    animal: {
      id: string,
      name: string;
      sex: SexAnimal;
      date_birth: Date;
      species: Species;
      history: string;
      characteristic: string;
      accompany: boolean;
      reason_request: string;
      created_at: Date,
      updated_at: Date,
      deleted_at: Date,
    };
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
  }>;

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
        return i.getProps().animal.getProps().name.toLowerCase().includes(filter.toLowerCase());
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
