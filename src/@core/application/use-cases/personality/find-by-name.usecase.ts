import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IPersonalityRepository } from '../../../domain/contracts';
import { Personality } from '../../../domain/entities/personality';

export namespace PersonalityFindByName {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input): Output {
      const personality = await this.repo.findByName(input.name);

      if (!personality) {
        throw new NotFoundError('Personality not found');
      }

      return personality;
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<Personality>;
}
