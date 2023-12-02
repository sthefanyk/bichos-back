import { NGOAttr } from './ngo';
import UserProps from './user-props';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';

export default class NGOProps extends UserProps {
  @Length(13, 13)
  @IsNotEmpty()
  cnpj: string;

  @Length(2, 45)
  @IsString()
  @IsNotEmpty()
  name_ngo: string;

  @IsDate()
  @IsNotEmpty()
  date_register: Date;

  constructor(props: NGOAttr) {
    super(props.userAttr);
    this.cnpj = props.cnpj instanceof CNPJ ? props.cnpj.cnpj : props.cnpj;
    this.name_ngo = props.name_ngo.toLowerCase();
    this.date_register = props.date_register;

    this.validate(this);
  }
}
