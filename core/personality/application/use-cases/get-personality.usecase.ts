import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import PersonalityRepository from '../../domain/repository/personality.repository';
import { PersonalityOutput } from '../dto/personality-output.dto';

export namespace GetPersonalityUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private personalityRepository: PersonalityRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.personalityRepository.findById(input.id);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = PersonalityOutput;
}
