import User, { UserAttr } from './user';
import NGOProps from './ngo-props';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { City } from '../localization/city';
import { Role } from '../../../shared/domain/enums/role.enum';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';

export type NGOAttr = {
  cnpj: CNPJ | string;
  name_ngo: string;
  date_register: Date;
};

export default class NGO extends User implements EntityMarker {
  constructor(
    private ngoProps: NGOAttr,
    userProps: UserAttr,
  ) {
    userProps.role = Role.NGO;
    ngoProps.cnpj =
      ngoProps.cnpj instanceof CNPJ
        ? ngoProps.cnpj
        : new CNPJ(ngoProps.cnpj);
    const props = new NGOProps(ngoProps, userProps);
    props.validate(props);
    super(props);
  }

  public update(data: {
    cnpj: CNPJ | string;
    name_ngo: string;
    date_register: Date;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  }) {
    this.ngoProps.cnpj =
      data.cnpj instanceof CNPJ ? data.cnpj : new CNPJ(data.cnpj);
      this.ngoProps.name_ngo = data.name_ngo.toLowerCase();
    this.ngoProps.date_register = data.date_register
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

  get cnpj(): string {
    return (this.ngoProps.cnpj as any).cnpj
  }

  get name_ngo(): string {
    return this.ngoProps.name_ngo;
  }

  get date_register(): Date {
    return this.ngoProps.date_register;
  }
}
