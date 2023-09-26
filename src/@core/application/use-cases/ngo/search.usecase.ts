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
import { Role } from '../../../shared/domain/enums/role.enum';
import {INGORepository} from '../../../domain/contracts/ngo-repository.interface';
import NGO from '../../../domain/entities/users/ngo';
import { NGOMapper } from '../../../domain/mappers/ngo.mapper';
import { City } from '../../../domain/entities/localization/city';

export namespace NGOSearch {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INGORepository) {}

    async execute(input: Input) : Promise<Output> {
      const ngos = await this.repo.findAll();
      const service = new ServiceConfig(ngos, ['full_name', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output | any {
      return {
        items: searchResult.items.map((i) => NGOMapper.getJsonWithEntity(i)),
        ...SearchOutputMapper.toOutput<NGO>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<{
    id: string;
    cnpj: string;
    name_ngo: string;
    date_register: Date;
    full_name: string;
    username: string;
    city: City;
    description: string;
    profile_picture: string;
    header_picture: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }>;

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
        return i.getProps().full_name.toLowerCase().includes(filter.toLowerCase());
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
