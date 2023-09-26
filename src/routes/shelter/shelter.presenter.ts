import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { ShelterSearch } from 'src/@core/application/use-cases/shelter';
import { ShelterOutputDto } from 'src/@core/application/DTOs/shelter.dto';
import { City } from 'src/@core/domain/entities/localization/city';

export class ShelterPresenter {
  id: string;

  responsible_cpf: string;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  responsible_date_birth: Date;

  name_shelter: string;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  star_date_shelter: Date;

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

  constructor(output: ShelterOutputDto) {
    this.responsible_cpf = output.responsible_cpf;
    this.responsible_date_birth = output.responsible_date_birth;
    this.name_shelter = output.name_shelter;
    this.star_date_shelter = output.star_date_shelter;
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

export class ShelterCollectionPresenter extends CollectionPresenter {
  data: ShelterPresenter[];

  constructor(output: ShelterSearch.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new ShelterPresenter(item));
  }
}
