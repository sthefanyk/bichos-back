import { IPersonalityRepository } from '../../../domain/contracts';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { Personality } from '../../../domain/entities/personality';

export namespace PersonalityActivate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input): Output {
      const personality = await this.repo.findById(input.id);
      if (!personality) throw new NotFoundError('Personality not found');

      personality.activate();
      return await this.repo.activate(personality);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Personality>;
}
