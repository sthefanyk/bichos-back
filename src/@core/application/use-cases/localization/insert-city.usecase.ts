import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import { State } from '../../../domain/entities/localization/state';
import UseCase from '../usecase';
import { City } from 'src/@core/domain/entities/localization/city';

export namespace CityInsert {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      const stateModel = await this.repo.getStateByName(input.name);
      const state = new State({
        name: stateModel.name,
        abbreviation: stateModel.abbreviation
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
