import { SortDirection } from 'src/@core/application/services/search';
import { UserSearch } from 'src/@core/application/use-cases/user';

export class SearchUsersDto implements UserSearch.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
