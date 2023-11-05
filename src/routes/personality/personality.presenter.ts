import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { PersonalitySearch } from 'src/@core/application/use-cases/personality';
import { PersonalityOutputDto } from 'src/@core/application/DTOs/personality.dto';

export class PersonalityPresenter {
  id: string;

  name: string;

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

  constructor(output: PersonalityOutputDto) {
    this.id = output.id;
    this.name = output.name;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class PersonalityCollectionPresenter extends CollectionPresenter {
  data: PersonalityPresenter[];

  constructor(output: PersonalitySearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new PersonalityPresenter(item));
  }
}
