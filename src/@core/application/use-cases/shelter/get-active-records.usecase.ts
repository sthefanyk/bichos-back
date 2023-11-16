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
import {IShelterRepository} from '../../../domain/contracts/shelter-repository.interface';
import Shelter, { ShelterAttr } from '../../../domain/entities/users/shelter';

export namespace ShelterGetActiveRecords {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IShelterRepository) {}

    async execute(input: Input) : Promise<Output> {
      const shelters = await this.repo.getActiveRecords();
      const service = new ServiceConfig(shelters, ['full_name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult) : Output | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Shelter>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<ShelterAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Shelter, Filter> {}
  class ServiceConfig extends SearchService<Shelter> {
    protected async applyFilter(
      items: Shelter[],
      filter: string | null,
    ): Promise<Shelter[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.full_name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Shelter[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Shelter[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
