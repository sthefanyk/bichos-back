import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import { User } from '../../domain/entities/user';
import UserRepository from '../../domain/repository/user.repository';
import { UserOutput } from '../dto/user-output.dto';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input) {
      const entity = new User(input);
      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }

  export type Input = {
    name: string;
    email: string;
    password: string;
    is_active?: boolean;
  };

  export type Output = UserOutput;
}
