import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import PersonalityRepository from '../../domain/repository/personality.repository';

export namespace DeletePersonalityUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private personalityRepository: PersonalityRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.personalityRepository.findById(input.id);
      await this.personalityRepository.delete(entity.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}
