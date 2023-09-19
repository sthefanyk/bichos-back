import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { UserSearch } from 'src/@core/application/use-cases/user';
import { Role } from 'src/@core/shared/domain/enums/role.enum';

export class UsersPresenter {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
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
    this.email = output.email;
    this.password = output.password;
    this.role = output.role;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export type Output = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export class UsersCollectionPresenter extends CollectionPresenter {
  data: UsersPresenter[];

  constructor(output: UserSearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new UsersPresenter(item));
  }
}
