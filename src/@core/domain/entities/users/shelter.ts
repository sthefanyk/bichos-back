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
  userAttr: UserAttr;
};

export default class Shelter extends User implements EntityMarker {
  private shelterProps: ShelterProps;

  constructor(shelterAttr: ShelterAttr) {
    shelterAttr.userAttr.role = Role.SHELTER;
    shelterAttr.responsible_cpf =
      shelterAttr.responsible_cpf instanceof CPF
        ? shelterAttr.responsible_cpf
        : new CPF(shelterAttr.responsible_cpf);

    const props = new ShelterProps(shelterAttr);

    super(props);
    this.shelterProps = props;
    this.shelterProps.validate(this.shelterProps);
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
      (data.responsible_cpf instanceof CPF
        ? data.responsible_cpf
        : new CPF(data.responsible_cpf)).cpf;
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

    this.shelterProps.validate(this.shelterProps);
  }

  get responsible_cpf(): string {
    return this.shelterProps.responsible_cpf;
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
