import { ListPersonalitiesUseCase } from '#personality/application/use-cases/list-personalities.usecase';
import { SortDirection } from '#seedwork/domain/repository/repository-contracts';

export class SearchPersonalityDto implements ListPersonalitiesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
