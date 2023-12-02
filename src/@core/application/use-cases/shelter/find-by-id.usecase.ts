import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IShelterRepository } from '../../../domain/contracts/shelter-repository.interface';
import Shelter from '../../../domain/entities/users/shelter';

export namespace ShelterFindById {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IShelterRepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findById(input.id);

      if (!user) {
        throw new NotFoundError('Shelter not found');
      }

      return user;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Shelter>;
}
