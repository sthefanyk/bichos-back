import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';

export namespace CityDelete {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      input.name = input.name.toUpperCase();
      if (!await this.repo.getCity(input.name)) throw new NotFoundError('City not found');
      return await this.repo.deleteCity(input.name);
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<{
    name: string
  }>;
}
