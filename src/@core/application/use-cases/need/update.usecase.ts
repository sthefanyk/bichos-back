import { INeedRepository } from '../../../domain/contracts';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { AlreadyExistsError } from '../../../shared/domain/errors/already-exists.error';

export namespace NeedUpdate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INeedRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const need = await this.repo.findById(input.id);
      if (!need) throw new NotFoundError('Need not found');

      need.update(input.name);
      return await this.repo.update(need);
    }

    async validate(input: Input) {
      if (!input.name) throw new RequiredError('name');

      const needExists = await this.repo.findByName(input.name);
      if (needExists && needExists.id !== input.id)
        throw new AlreadyExistsError('Name already exists');
    }
  }

  export type Input = {
    id: string;
    name: string;
  };

  export type Output = Promise<{
    id: string;
    name: string;
  }>;
}
