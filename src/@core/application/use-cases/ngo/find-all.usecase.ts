import NGO from '../../../domain/entities/users/ngo';
import UseCase from '../usecase';
import { INGORepository } from '../../../domain/contracts/ngo-repository.interface';

export namespace NGOFindAll {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INGORepository) {}

    async execute(): Output {
      return await this.repo.findAll();
    }
  }

  export type Input = null;

  export type Output = Promise<NGO[]>;
}
