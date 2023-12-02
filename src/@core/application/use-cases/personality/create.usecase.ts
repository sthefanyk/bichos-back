import UseCase from '../usecase';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { Personality } from '../../../domain/entities/personality';
import { IPersonalityRepository } from '../../../domain/contracts';
import { AlreadyExistsError } from '../../../shared/domain/errors/already-exists.error';

export namespace PersonalityCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonalityRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const personality = new Personality({ name: input.name });
      return await this.repo.insert(personality);
    }

    async validate(input: Input) {
      if (!input.name) throw new RequiredError('name');

      const personalityExists = await this.repo.findByName(input.name);
      if (personalityExists)
        throw new AlreadyExistsError('Name already exists');
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
