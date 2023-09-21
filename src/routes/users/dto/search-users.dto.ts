import { SortDirection } from 'src/@core/application/services/search';
import { PersonSearch } from 'src/@core/application/use-cases/person';

export class SearchUsersDto implements PersonSearch.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
