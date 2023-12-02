import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';

export namespace StateDelete {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();
      if (!(await this.repo.getState(input.name)))
        throw new NotFoundError('State not found');
      return await this.repo.deleteState(input.name);
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<{
    name: string;
    cities: string[];
  }>;
}
