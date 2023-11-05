import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { BreedSearch } from 'src/@core/application/use-cases/breed';
import { BreedOutputDto } from 'src/@core/application/DTOs/breed.dto';
import { Species } from 'src/@core/shared/domain/enums/species.enum';

export class BreedPresenter {
  id: string;

  name: string;

  specie: Species;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  updated_at: Date;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  deleted_at: Date;

  constructor(output: BreedOutputDto) {
    this.id = output.id;
    this.name = output.name;
    this.specie = +output.specie;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class BreedCollectionPresenter extends CollectionPresenter {
  data: BreedPresenter[];

  constructor(output: BreedSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new BreedPresenter(item));
  }
}
