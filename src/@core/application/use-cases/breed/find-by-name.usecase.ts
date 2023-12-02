import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IBreedRepository } from 'src/@core/domain/contracts';
import { Breed } from 'src/@core/domain/entities/breed';

export namespace BreedFindByName {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IBreedRepository) {}

    async execute(input: Input): Output {
      const breed = await this.repo.findByName(input.name);

      if (!breed) {
        throw new NotFoundError('Breed not found');
      }

      return breed;
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<Breed>;
}
