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
import {INeedRepository} from '../../../domain/contracts/need-repository.interface';
import { Need, NeedAttr } from 'src/@core/domain/entities/need';

export namespace NeedGetActiveRecords {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: INeedRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const needs = await this.repo.getActiveRecords();
      const service = new ServiceConfig(needs, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Need>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<Need[]>;

  export type SearchOutput = SearchOutputDto<NeedAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Need, Filter> {}
  class ServiceConfig extends SearchService<Need> {
    protected async applyFilter(
      items: Need[],
      filter: string | null,
    ): Promise<Need[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Need[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Need[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
