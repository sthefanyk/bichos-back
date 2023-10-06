import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { PersonSearch } from 'src/@core/application/use-cases/person';
import { PersonOutputDto } from 'src/@core/application/DTOs/person.dto';
import { City } from 'src/@core/domain/entities/localization/city';

export class PersonPresenter {
  id: string;

  cpf: string;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  date_birth: Date;

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

  constructor(output: PersonOutputDto) {
    this.cpf = output.cpf;
    this.date_birth = output.date_birth;
    this.full_name = output.full_name;
    this.username = output.username;
    this.email = output.email;
    this.password = output.password;
    this.city = (output as any).city_name;
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

export class PersonCollectionPresenter extends CollectionPresenter {
  data: PersonPresenter[];

  constructor(output: PersonSearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new PersonPresenter(item));
  }
}
