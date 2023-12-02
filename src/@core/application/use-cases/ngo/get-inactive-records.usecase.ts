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
import { INGORepository } from '../../../domain/contracts/ngo-repository.interface';
import NGO, { NGOAttr } from '../../../domain/entities/users/ngo';

export namespace NGOGetInactiveRecords {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: INGORepository) {}

    async execute(input: Input): Promise<SearchOutput> {
      const ngos = await this.repo.getInactiveRecords();
      const service = new ServiceConfig(ngos, ['full_name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<NGO>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<NGO[]>;

  export type SearchOutput = SearchOutputDto<NGOAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<NGO, Filter> {}
  class ServiceConfig extends SearchService<NGO> {
    protected async applyFilter(
      items: NGO[],
      filter: string | null,
    ): Promise<NGO[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.full_name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: NGO[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<NGO[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
