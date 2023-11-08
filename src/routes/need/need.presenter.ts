import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { NeedSearch } from 'src/@core/application/use-cases/need';
import { NeedOutputDto } from 'src/@core/application/DTOs/need.dto';

export class NeedPresenter {
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

  constructor(output: NeedOutputDto) {
    this.id = output.id;
    this.name = output.name;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class NeedCollectionPresenter extends CollectionPresenter {
  data: NeedPresenter[];

  constructor(output: NeedSearch.SearchOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new NeedPresenter(item));
  }
}
