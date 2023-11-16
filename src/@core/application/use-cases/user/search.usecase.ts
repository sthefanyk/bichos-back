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
import {IUserRepository} from '../../../domain/contracts/user-repository.interface';
import User, { UserAttr } from 'src/@core/domain/entities/users/user';

export namespace UserSearch {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: IUserRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const users = await this.repo.findAllUser();
      const service = new ServiceConfig(users, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<User>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<User[]>;

  export type SearchOutput = SearchOutputDto<UserAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<User, Filter> {}
  class ServiceConfig extends SearchService<User> {
    protected async applyFilter(
      items: User[],
      filter: string | null,
    ): Promise<User[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: User[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<User[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
