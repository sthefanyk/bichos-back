import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IShelterRepository } from '../../../domain/contracts/shelter-repository.interface';
import User from '../../../domain/entities/users/user';

export namespace ShelterFindByNameShelter {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IShelterRepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findByNameShelter(input.name_shelter);

      if (!user) {
        throw new NotFoundError('Shelter not found');
      }

      return user;
    }
  }

  export type Input = {
    name_shelter: string;
  };

  export type Output = Promise<User>;
}
