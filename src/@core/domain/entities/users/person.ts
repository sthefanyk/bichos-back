import User, { UserAttr } from './user';
import PersonProps from './person-props';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { City } from '../localization/city';
import { Role } from '../../../shared/domain/enums/role.enum';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';

export type PersonAttr = {
  cpf: CPF | string;
  date_birth: Date;
  userAttr: UserAttr;
};

export default class Person extends User implements EntityMarker {
  private personProps: PersonProps;

  constructor(personAttr: PersonAttr) {
    personAttr.userAttr.role = Role.PERSON;
    personAttr.cpf =
      personAttr.cpf instanceof CPF ? personAttr.cpf : new CPF(personAttr.cpf);

    const props = new PersonProps(personAttr);

    super(props);
    this.personProps = props;
    this.personProps.validate(this.personProps);
  }

  public update(data: {
    cpf: CPF | string;
    date_birth: Date;
    full_name: string;
    username: string;
    name: string;
    email: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  }) {
    this.personProps.cpf = (
      data.cpf instanceof CPF ? data.cpf : new CPF(data.cpf)
    ).cpf;
    this.personProps.date_birth = data.date_birth;

    this.updateUser({
      full_name: data.full_name,
      username: data.username,
      name: data.name,
      email: data.email,
      city: data.city,
      description: data.description,
      profile_picture: data.profile_picture,
      header_picture: data.header_picture,
    });

    this.personProps.validate(this.personProps);
  }

  get cpf(): string {
    return this.personProps.cpf;
  }

  get date_birth(): Date {
    return this.personProps.date_birth;
  }
}
