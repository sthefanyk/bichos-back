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
  }) {
    this.shelterProps.responsible_cpf =
      data.responsible_cpf instanceof CPF
        ? data.responsible_cpf
        : new CPF(data.responsible_cpf);
    this.shelterProps.responsible_date_birth = data.responsible_date_birth;
    this.shelterProps.name_shelter = data.name_shelter;
    this.shelterProps.star_date_shelter = data.star_date_shelter;
    this.props.full_name = data.full_name.toLowerCase();
    this.props.username = data.username.toLowerCase();
    this.props.city = data.city;
    this.props.email = data.email.toLowerCase();
    this.props.password = data.password;
    this.props.description = data.description ?? this.props.description;
    this.props.updated_at = new Date();

    this.props.validate(this.props);
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
