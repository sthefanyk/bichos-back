import User, { UserAttr } from './user';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { City } from '../localization/city';
import { Role } from '../../../shared/domain/enums/role.enum';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import ShelterProps from './shelter-props';

export type ShelterAttr = {
  responsible_cpf: CPF | string;
  responsible_date_birth: Date;
  name_shelter: string;
  star_date_shelter: Date;
};

export default class Shelter extends User implements EntityMarker {
  constructor(
    private shelterProps: ShelterAttr,
    userProps: UserAttr,
  ) {
    userProps.role = Role.SHELTER;
    shelterProps.responsible_cpf =
      shelterProps.responsible_cpf instanceof CPF
        ? shelterProps.responsible_cpf
        : new CPF(shelterProps.responsible_cpf);
    const props = new ShelterProps(shelterProps, userProps);
    props.validate(props);
    super(props);
  }

  public update(data: {
    responsible_cpf: CPF | string;
    responsible_date_birth: Date;
    name_shelter: string;
    star_date_shelter: Date;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  }) {
    this.shelterProps.responsible_cpf =
      data.responsible_cpf instanceof CPF
        ? data.responsible_cpf
        : new CPF(data.responsible_cpf);
    this.shelterProps.responsible_date_birth = data.responsible_date_birth;
    this.shelterProps.name_shelter = data.name_shelter;
    this.shelterProps.star_date_shelter = data.star_date_shelter;
    this.updateUser({
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      password: data.password,
      city: data.city,
      description: data.description,
      profile_picture: data.profile_picture,
      header_picture: data.header_picture
    });
  }

  get responsible_cpf(): string {
    return (this.shelterProps.responsible_cpf as any).cpf;
  }

  get responsible_date_birth(): Date {
    return this.shelterProps.responsible_date_birth;
  }

  get name_shelter(): string {
    return this.shelterProps.name_shelter;
  }

  get star_date_shelter(): Date {
    return this.shelterProps.star_date_shelter;
  }
}
