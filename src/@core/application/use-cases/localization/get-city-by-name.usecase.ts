import { ILocalization } from '../../../domain/contracts/localization-repository.interface';
import UseCase from '../usecase';
import { City } from '../../../domain/entities/localization/city';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export namespace CityGetByName {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();
      if (!(await this.repo.getCity(input.name)))
        throw new NotFoundError('City not found');
      return await this.repo.getCityByName(input.name);
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<City>;
}
