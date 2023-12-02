import Shelter from '../../../domain/entities/users/shelter';
import UseCase from '../usecase';
import { IShelterRepository } from '../../../domain/contracts/shelter-repository.interface';

export namespace ShelterFindAll {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IShelterRepository) {}

    async execute(): Output {
      return await this.repo.findAll();
    }
  }

  export type Input = null;

  export type Output = Promise<Shelter[]>;
}
