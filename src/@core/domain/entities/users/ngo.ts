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
  userAttr: UserAttr;
};

export default class NGO extends User implements EntityMarker {
  
  private NGOProps: NGOProps;

  constructor(ngoAttr: NGOAttr) {
    ngoAttr.userAttr.role = Role.NGO;
    ngoAttr.cnpj =
      ngoAttr.cnpj instanceof CNPJ
        ? ngoAttr.cnpj
        : new CNPJ(ngoAttr.cnpj);
    const props = new NGOProps(ngoAttr);
    super(props);
    this.NGOProps = props;
    this.NGOProps.validate(this.NGOProps);
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
    this.NGOProps.cnpj =
      (data.cnpj instanceof CNPJ ? data.cnpj : new CNPJ(data.cnpj)).cnpj;
      this.NGOProps.name_ngo = data.name_ngo.toLowerCase();
    this.NGOProps.date_register = data.date_register
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

    this.NGOProps.validate(this.NGOProps);
  }

  get cnpj(): string {
    return this.NGOProps.cnpj;
  }

  get name_ngo(): string {
    return this.NGOProps.name_ngo;
  }

  get date_register(): Date {
    return this.NGOProps.date_register;
  }
}
