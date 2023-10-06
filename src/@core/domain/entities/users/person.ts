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

  private personProps: PersonProps;

  constructor(
    personAttr: PersonAttr,
    userProps: UserAttr,
  ) {
    userProps.role = Role.PERSON;
    personAttr.cpf =
      personAttr.cpf instanceof CPF
        ? personAttr.cpf
        : new CPF(personAttr.cpf);

    const props = new PersonProps(personAttr, userProps);

    super(props);
    this.personProps = props;
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

  get cpf(): string {
    return (this.personProps.cpf as any).cpf
  }

  get date_birth(): Date {
    return this.personProps.date_birth;
  }
}
