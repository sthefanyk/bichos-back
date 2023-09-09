import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import UserRepository from '../../domain/repository/user.repository';
import { UserOutput } from '../dto/user-output.dto';

export namespace GetUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input) {
      const entity = await this.userRepository.findById(input.id);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = UserOutput;
}
