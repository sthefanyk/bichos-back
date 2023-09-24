import {IPersonRepository} from "../../../domain/contracts/person-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";
import { ILocalization } from "src/@core/domain/contracts";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";

export namespace PersonUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(
            private repo: IPersonRepository,
            private repoLocalization: ILocalization,
        ) {}

        async execute(input: Input): Output {
            const person = await this.repo.findById(input.id);

            if (!person) {
                throw new NotFoundError("User not found");
            }

            if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
            const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
            const cpf = new CPF(input.cpf);

            const cpfExists = await this.repo.findByCpf(cpf);
            const emailExists = await this.repo.findByEmail(input.email.toLowerCase());
            const usernameExists = await this.repo.findByUsername(input.username.toLowerCase());
            
            const id = person.getProps().id.getIdString();
            if (emailExists.id && emailExists.id !== id) throw new AlreadyExistsError('Email already exists');
            if (usernameExists.id && usernameExists.id !== id) throw new AlreadyExistsError('Username already exists');
            if (cpfExists.id && cpfExists.id !== id) throw new AlreadyExistsError('CPF already exists');

            person.update({
                cpf: input.cpf,
                date_birth: input.date_birth,
                full_name: input.full_name,
                username: input.username,
                city: city,
                email: input.email,
                password: input.password,
                description: input.description
            });
            await person.generatePasswordHash();
            
            return await this.repo.update(person);
        }
    }

    export type Input = {
        id: string;
        cpf: string;
        date_birth: Date;
        full_name: string;
        username: string;
        email: string;
        password: string;
        city: string;
        description?: string;
    }

    export type Output = Promise<{
        id: string;
        name: string;
        email: string;
    }>
}
