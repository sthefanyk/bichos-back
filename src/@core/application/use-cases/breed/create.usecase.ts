import UseCase from '../usecase';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import { Breed } from 'src/@core/domain/entities/breed';
import { IBreedRepository } from 'src/@core/domain/contracts';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';

export namespace BreedCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IBreedRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const breed = new Breed({
        name: input.name,
        specie: +input.specie
      });
      
      return await this.repo.insert(breed);
    }

    async validate(input: Input) {
      if(!input.name) throw new RequiredError('name');
      if(!input.specie) throw new RequiredError('specie');

      const breedExists = await this.repo.findByName(input.name);
      if (breedExists && breedExists.specie === +input.specie)
        throw new AlreadyExistsError('Name already exists');
    }
  }

  export type Input = {
    name: string;
    specie: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
