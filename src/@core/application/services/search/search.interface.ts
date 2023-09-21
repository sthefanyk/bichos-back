import Entity from '../../../shared/domain/entities/entity';
import EntityProps from '../../../shared/domain/entities/entity-props';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export interface ISearch<
  P extends EntityProps,
  E extends Entity<P>,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>,
> {
  // items: E[];
  // sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
