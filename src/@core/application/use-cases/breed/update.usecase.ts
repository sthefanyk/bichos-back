import { IBreedRepository } from "src/@core/domain/contracts";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";

export namespace BreedUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IBreedRepository) {}

        async execute(input: Input): Output {
            await this.validate(input);
            
            const breed = await this.repo.findById(input.id);
            if (!breed) throw new NotFoundError("Breed not found");

            breed.update(input.name, +input.specie);

            return await this.repo.update(breed);
        }

        async validate(input: Input) {
            if(!input.name) throw new RequiredError('name');
            if(!input.specie) throw new RequiredError('specie');

            const breedExists = await this.repo.findByName(input.name);
      
            if (breedExists && breedExists.id !== input.id && breedExists.specie === +input.specie) 
                throw new AlreadyExistsError('Name already exists');
        }
    }

    export type Input = {
        id: string;
        name: string;
        specie: string;
    }

    export type Output = Promise<{
        id: string;
        name: string;
        specie: string;
    }>
}
