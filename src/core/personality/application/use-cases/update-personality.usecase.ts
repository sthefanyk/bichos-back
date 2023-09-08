import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import PersonalityRepository from '../../domain/repository/personality.repository';
import { PersonalityOutput } from '../dto/personality-output.dto';

export namespace UpdatePersonalityUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private personalityRepository: PersonalityRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.personalityRepository.findById(input.id);
      entity.update(input.name);

      if (input.is_active === true) {
        entity.activate();
      }

      if (input.is_active === false) {
        entity.deactivate();
      }

      await this.personalityRepository.update(entity);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
    name: string;
    is_active?: boolean;
  };

  export type Output = PersonalityOutput;
}
