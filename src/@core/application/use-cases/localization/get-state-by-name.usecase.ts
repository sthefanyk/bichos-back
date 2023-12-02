import { ILocalization } from '../../../domain/contracts/localization-repository.interface';
import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export namespace StateGetByName {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();
      if (!(await this.repo.getState(input.name)))
        throw new NotFoundError('State not found');
      return await this.repo.getStateByName(input.name);
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<{
    name: string;
    abbreviation: string;
  }>;
}
