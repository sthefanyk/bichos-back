import UseCase from '../usecase';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { Need } from '../../../domain/entities/need';
import { INeedRepository } from '../../../domain/contracts';
import { AlreadyExistsError } from '../../../shared/domain/errors/already-exists.error';

export namespace NeedCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INeedRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const need = new Need({ name: input.name });
      return await this.repo.insert(need);
    }

    async validate(input: Input) {
      if (!input.name) throw new RequiredError('name');

      const needExists = await this.repo.findByName(input.name);
      if (needExists) throw new AlreadyExistsError('Name already exists');
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
