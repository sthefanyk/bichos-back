import { SortDirection } from '../../../@seedwork/domain/repository/repository-contracts';
import { InMemorySearchableRepository } from '../../../@seedwork/domain/repository/in-memory.repository';
import { Personality } from '../../domain/entities/personality';
import PersonalityRepository from '../../domain/repository/personality.repository';

export default class PersonalityInMemoryRepository
  extends InMemorySearchableRepository<Personality>
  implements PersonalityRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Personality[],
    filter: PersonalityRepository.Filter,
  ): Promise<Personality[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Personality[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Personality[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}
