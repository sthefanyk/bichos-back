import { CreateUsersDto } from './create-users.dto';
import { UserUpdate } from 'src/@core/application/use-cases/user';

export class UpdateUsersDto
  extends CreateUsersDto
  implements Omit<UserUpdate.Input, 'id'> {}
