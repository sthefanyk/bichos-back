import IPersonalityRepository from '../../../domain/contracts/personality-repository.interface';
import Personality from '../../../domain/entities/personality';
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

export namespace PersonalityGetActiveRecords {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input): Promise<Output> {
      // const personalities = await this.repo.getActiveRecords();
      // const service = new ServiceConfig(personalities, ['name', 'created_at']);

      // const params = new SearchParams(input);

      // const searchResult = await service.search(params);

      // return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output {
      // return {
      //   items: searchResult.items.map((i) => i.toJson()),
      //   ...SearchOutputMapper.toOutput<Personality>(searchResult),
      // };
    }
  }

  export type Input = SearchInputDto;

  export type Output = void

  // export type Output = SearchOutputDto<{
  //   id: string;
  //   name: string;
  //   created_at: Date;
  //   updated_at: Date;
  //   deleted_at: Date;
  // }>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Personality, Filter> {}
  class ServiceConfig extends SearchService<Personality> {
    protected async applyFilter(
      items: Personality[],
      filter: string | null,
    ): Promise<Personality[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.getProps().name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Personality[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Personality[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
