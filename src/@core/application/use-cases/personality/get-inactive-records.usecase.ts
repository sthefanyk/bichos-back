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
import {IPersonalityRepository} from '../../../domain/contracts/personality-repository.interface';
import { Personality, PersonalityAttr } from 'src/@core/domain/entities/personality';

export namespace PersonalityGetInactiveRecords {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const personalities = await this.repo.getInactiveRecords();
      const service = new ServiceConfig(personalities, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Personality>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<Personality[]>;

  export type SearchOutput = SearchOutputDto<PersonalityAttr>;

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
        return i.name.toLowerCase().includes(filter.toLowerCase());
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
