import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { NGOSearch } from 'src/@core/application/use-cases/ngo';
import { NGOOutputDto } from 'src/@core/application/DTOs/ngo.dto';
import { City } from 'src/@core/domain/entities/localization/city';

export class NGOPresenter {
  id: string;

  cnpj: string;

  name_ngo: string;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  date_register: Date;

  city: City;

  description: string;

  profile_picture: string;

  header_picture: string;

  full_name: string;

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

  constructor(output: NGOOutputDto) {
    this.cnpj = output.cnpj;
    this.name_ngo = output.name_ngo;
    this.date_register = output.date_register;
    this.full_name = output.full_name;
    this.username = output.username;
    this.email = output.email;
    this.password = output.password;
    this.city = output.city;
    this.description = output.description;
    this.profile_picture = output.profile_picture;
    this.header_picture = output.header_picture;
    this.role = output.role;
    this.id = output.id;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class NGOCollectionPresenter extends CollectionPresenter {
  data: NGOPresenter[];

  constructor(output: NGOSearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new NGOPresenter(item));
  }
}
