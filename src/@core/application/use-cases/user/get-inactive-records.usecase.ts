import IUserRepository from '../../../domain/contracts/user-repository.interface';
import UserProps from '../../../domain/entities/user-props';
import User from '../../../domain/entities/user';
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

export namespace UserGetInactiveRecords {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IUserRepository) {}

    async execute(input: Input): Promise<Output> {
      const users = await this.repo.getInactiveRecords();
      const service = new ServiceConfig(users, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<UserProps, User>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<{
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<UserProps, User, Filter> {}
  class ServiceConfig extends SearchService<UserProps, User> {
    protected async applyFilter(
      items: User[],
      filter: string | null,
    ): Promise<User[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.getProps().name.toLowerCase().includes(filter.toLowerCase());
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
