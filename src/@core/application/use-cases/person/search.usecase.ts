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
import {IPersonRepository} from '../../../domain/contracts/person-repository.interface';
import Person, { PersonAttr } from '../../../domain/entities/users/person';

export namespace PersonSearch {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonRepository) {}

    async execute(input: Input) : Promise<Output> {
      const persons = await this.repo.findAll();
      const service = new ServiceConfig(persons, ['full_name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Person>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<PersonAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Person, Filter> {}
  class ServiceConfig extends SearchService<Person> {
    protected async applyFilter(
      items: Person[],
      filter: string | null,
    ): Promise<Person[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.full_name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Person[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Person[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
