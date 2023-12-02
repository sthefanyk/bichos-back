import { ILocalization } from '../../../domain/contracts/localization-repository.interface';
import UseCase from '../usecase';

export namespace ListStates {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: ILocalization) {}

    async execute(input: Input): Output {
      return await this.repo.listStates();
    }
  }

  export type Input = void;
  export type Output = Promise<{
    states: {
      name: string;
      abbreviation: string;
    }[];
  }>;
}
