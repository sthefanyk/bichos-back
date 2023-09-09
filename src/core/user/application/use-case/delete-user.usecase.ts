import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import UserRepository from '../../domain/repository/user.repository';

export namespace DeleteUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input) {
      const entity = await this.userRepository.findById(input.id);
      await this.userRepository.delete(entity.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}
