import { SortDirection } from 'src/@core/application/services/search';
import { PersonalitySearch } from 'src/@core/application/use-cases/personality';

export class SearchPersonalityDto implements PersonalitySearch.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
