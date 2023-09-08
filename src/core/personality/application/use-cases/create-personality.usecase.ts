import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import PersonalityRepository from '../../domain/repository/personality.repository';
import { Personality } from '../../domain/entities/personality';
import { PersonalityOutput } from '../dto/personality-output.dto';

export namespace CreatePersonalityUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private personalityRepository: PersonalityRepository.Repository,
    ) {}

    async execute(input: Input): Promise<PersonalityOutput> {
      const entity = new Personality(input);
      await this.personalityRepository.insert(entity);

      return entity.toJSON();
    }
  }

  export type Input = {
    name: string;
    is_active?: boolean;
  };

  export type Output = PersonalityOutput;
}
