import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { PersonSearch } from 'src/@core/application/use-cases/person';
import { City } from 'src/@core/domain/entities/localization/city';

export class UsersPresenter {
  id: string;
  cpf: string;
  fullName: string;
  username: string;
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
    this.cpf = output.cpf;
    this.fullName = output.fullName;
    this.username = output.username;
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
  cpf: string;
  fullName: string;
  username: string;
  city: City;
  description: string;
  date_birth: Date;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export class UsersCollectionPresenter extends CollectionPresenter {
  data: UsersPresenter[];

  constructor(output: PersonSearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new UsersPresenter(item));
  }
}
