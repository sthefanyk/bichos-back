import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import { State } from '../../../domain/entities/localization/state';
import UseCase from '../usecase';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';

export namespace StateInsert {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();

      if (await this.repo.getState(input.name)) {
        throw new AlreadyExistsError('State already exists');
      }

      const state = new State({
        name: input.name,
        abbreviation: input.abbreviation,
      });

      return await this.repo.insertState(state);
    }
  }

  export type Input = {
    name: string;
    abbreviation: string;
  };

  export type Output = Promise<{
    name: string;
    abbreviation: string;
  }>;
}
