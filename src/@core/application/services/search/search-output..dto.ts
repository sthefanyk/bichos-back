import Entity from '../../../shared/domain/entities/entity';
import EntityProps from '../../../shared/domain/entities/entity-props';
import { SearchResult } from './search-result';

export type SearchOutputDto<Items = any> = {
  items: Items[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class SearchOutputMapper {
  static toOutput<P extends EntityProps, E extends Entity<P>>(
    result: SearchResult<P, E>,
  ): Omit<SearchOutputDto, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
