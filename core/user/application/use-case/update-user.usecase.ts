import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import UserRepository from '../../domain/repository/user.repository';
import { UserOutput } from '../dto/user-output.dto';

export namespace UpdateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input) {
      const entity = await this.userRepository.findById(input.id);
      entity.update( input.name, input.email, input.password );

      if (input.is_active === true) {
        entity.activate();
      }

      if (input.is_active === false) {
        entity.deactivate();
      }

      await this.userRepository.update(entity);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
    name: string;
    email: string;
    password: string;
    is_active?: boolean;
  };

  export type Output = UserOutput;
}
