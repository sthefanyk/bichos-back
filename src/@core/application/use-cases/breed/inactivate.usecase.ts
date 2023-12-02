import { IBreedRepository } from '../../../domain/contracts';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { Breed } from '../../../domain/entities/breed';

export namespace BreedInactivate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IBreedRepository) {}

    async execute(input: Input): Output {
      const breed = await this.repo.findById(input.id);
      if (!breed) throw new NotFoundError('Breed not found');

      breed.inactivate();
      return await this.repo.inactivate(breed);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Breed>;
}
