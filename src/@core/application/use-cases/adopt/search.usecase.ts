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
import {IAdoptRepository} from '../../../domain/contracts/adopt-repository.interface';
import { Adopt, AdoptAttr } from 'src/@core/domain/entities/adopt/adopt';

export namespace AdoptSearch {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: IAdoptRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const adopts = await this.repo.findAll();
      const service = new ServiceConfig(adopts, ['created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Adopt>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<Adopt[]>;

  export type SearchOutput = SearchOutputDto<AdoptAttr>;

  export type Filter = string;

  export class SearchParams extends SP<Filter> {}

  export class SearchResult extends SR<Adopt, Filter> {}

  class ServiceConfig extends SearchService<Adopt> {
    protected async applyFilter(
      items: Adopt[],
    ): Promise<Adopt[]> {
      return items;
    }

    protected async applySort(
      items: Adopt[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Adopt[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
