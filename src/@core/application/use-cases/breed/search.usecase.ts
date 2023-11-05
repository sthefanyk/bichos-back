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
import {IBreedRepository} from '../../../domain/contracts/breed-repository.interface';
import { Breed } from 'src/@core/domain/entities/breed';

export namespace BreedSearch {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: IBreedRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const breeds = await this.repo.findAll();
      const service = new ServiceConfig(breeds, ['name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Breed>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<Breed[]>;

  export type SearchOutput = SearchOutputDto<{
    id: string;
    name: string;
    specie: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Breed, Filter> {}
  class ServiceConfig extends SearchService<Breed> {
    protected async applyFilter(
      items: Breed[],
      filter: string | null,
    ): Promise<Breed[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Breed[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Breed[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
