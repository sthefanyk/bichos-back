import { UpdateUserUseCase } from 'src/core/user/application/use-case';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUsersDto
  extends CreateUsersDto
  implements Omit<UpdateUserUseCase.Input, 'id'> {}
