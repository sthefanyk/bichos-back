import { ILocalization } from '../../../domain/contracts/localization-repository.interface';
import { State } from '../../../domain/entities/localization/state';
import UseCase from '../usecase';
import { City } from '../../../domain/entities/localization/city';
import { AlreadyExistsError } from '../../../shared/domain/errors/already-exists.error';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export namespace CityInsert {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();
      input.state = input.state.toUpperCase();

      if (await this.repo.getCity(input.name)) {
        throw new AlreadyExistsError('City already exists');
      }

      if (!(await this.repo.getState(input.state)))
        throw new NotFoundError('State not found');

      const stateModel = await this.repo.getStateByName(input.state);

      const state = new State({
        name: stateModel.name,
        abbreviation: stateModel.abbreviation,
      });

      const city = new City({
        name: input.name,
        state: state,
      });

      return await this.repo.insertCity(city);
    }
  }

  export type Input = {
    name: string;
    state: string;
  };

  export type Output = Promise<{
    name: string;
    state: {
      name: string;
      abbreviation: string;
    };
  }>;
}
