import { SortDirection } from '#seedwork/domain/repository/repository-contracts';
import { ListUsersUseCase } from 'src/core/user/application/use-case';

export class SearchUsersDto implements ListUsersUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
