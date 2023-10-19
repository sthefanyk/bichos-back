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
import {IShelterRepository} from '../../../domain/contracts/shelter-repository.interface';
import Shelter from '../../../domain/entities/users/shelter';
import { ShelterMapper } from '../../../domain/mappers/shelter.mapper';
import { City } from '../../../domain/entities/localization/city';

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
        items: searchResult.items.map((i) => ShelterMapper.getJsonWithEntity(i)),
        ...SearchOutputMapper.toOutput<Shelter>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<{
    id: string;
    responsible_cpf: string;
    responsible_date_birth: Date;
    name_shelter: string;
    star_date_shelter: Date;
    full_name: string;
    username: string;
    name: string;
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
