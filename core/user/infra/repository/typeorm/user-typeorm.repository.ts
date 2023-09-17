import { User } from '../../../domain/entities/user';
import { TypeormSearchableRepository } from '../../../../@seedwork/domain/repository/typeorm.repository';
import UserRepository from '../../../domain/repository/user.repository';
import { SortDirection } from '../../../../@seedwork/domain/repository/repository-contracts';
import { User as Model } from './user.model';

export default class UserTypeormRepository
  extends TypeormSearchableRepository<User, Model>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter,
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}
