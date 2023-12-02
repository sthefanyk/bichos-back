import { IPersonalityRepository } from '../../../domain/contracts';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { Personality } from '../../../domain/entities/personality';

export namespace PersonalityInactivate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input): Output {
      const personality = await this.repo.findById(input.id);
      if (!personality) throw new NotFoundError('Personality not found');

      personality.inactivate();
      return await this.repo.inactivate(personality);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Personality>;
}
