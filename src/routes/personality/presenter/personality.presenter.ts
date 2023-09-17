import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';
import { PersonalitySearch } from 'src/@core/application/use-cases/personality';

export class PersonalityPresenter {
  id: string;
  name: string;
  is_active: boolean;
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

  constructor(output: Output) {
    this.id = output.id;
    this.name = output.name;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export type Output = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export class PersonalityCollectionPresenter extends CollectionPresenter {
  data: PersonalityPresenter[];

  constructor(output: PersonalitySearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new PersonalityPresenter(item));
  }
}
