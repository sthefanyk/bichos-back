import User, { UserAttr } from './user';
import PersonProps from './person-props';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { City } from '../localization/city';
import { Role } from '../../../shared/domain/enums/role.enum';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';

export type PersonAttr = {
  cpf: CPF | string;
  date_birth: Date;
};

export default class Person extends User implements EntityMarker {
  constructor(
    private personProps: PersonAttr,
    userProps: UserAttr,
  ) {
    userProps.role = Role.PERSON;
    personProps.cpf =
      personProps.cpf instanceof CPF
        ? personProps.cpf
        : new CPF(personProps.cpf);
    const props = new PersonProps(personProps, userProps);
    props.validate(props);
    super(props);
  }

  public update(data: {
    cpf: CPF | string;
    date_birth: Date;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  }) {
    this.personProps.cpf =
      data.cpf instanceof CPF ? data.cpf : new CPF(data.cpf);
    this.personProps.date_birth = data.date_birth;
    this.props.full_name = data.full_name.toLowerCase();
    this.props.username = data.username.toLowerCase();
    this.props.city = data.city;
    this.props.email = data.email.toLowerCase();
    this.props.password = data.password;
    this.props.description = data.description ?? this.props.description;
    this.props.profile_picture = data.profile_picture ?? this.props.profile_picture;
    this.props.header_picture = data.header_picture ?? this.props.header_picture;
    this.props.updated_at = new Date();
    
    this.props.validate(this.props);
  }

  get cpf(): string {
    return (this.personProps.cpf as any).cpf
  }

  get date_birth(): Date {
    return this.personProps.date_birth;
  }
}
