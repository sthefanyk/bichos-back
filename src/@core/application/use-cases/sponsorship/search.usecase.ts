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
import {ISponsorshipRepository} from '../../../domain/contracts/sponsorship-repository.interface';
import { Sponsorship } from 'src/@core/domain/entities/sponsorship/sponsorship';
import { SponsorshipOutputDto } from '../../DTOs/sponsorship.dto';

export namespace SponsorshipSearch {
  export class Usecase implements UseCase<Input, SearchOutput> {
    constructor(private repo: ISponsorshipRepository) {}

    async execute(input: Input) : Promise<SearchOutput> {
      const sponsorships = await this.repo.findAll();
      const service = new ServiceConfig(sponsorships, ['created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): SearchOutput | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Sponsorship>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = Promise<Sponsorship[]>;

  export type SearchOutput = SearchOutputDto<SponsorshipOutputDto>;

  export type Filter = string;

  export class SearchParams extends SP<Filter> {}

  export class SearchResult extends SR<Sponsorship, Filter> {}

  class ServiceConfig extends SearchService<Sponsorship> {
    protected async applyFilter(
      items: Sponsorship[],
    ): Promise<Sponsorship[]> {
      return items;
    }

    protected async applySort(
      items: Sponsorship[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Sponsorship[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
