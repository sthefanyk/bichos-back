import {IPersonRepository} from "../../../domain/contracts/person-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";
import { ILocalization } from "src/@core/domain/contracts";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";

export namespace PersonUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(
            private repo: IPersonRepository,
            private repoLocalization: ILocalization,
        ) {}

        async execute(input: Input): Output {
            await this.validate(input);
            
            const person = await this.repo.findById(input.id);
            const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
            person.update({
                cpf: new CPF(input.cpf),
                date_birth: new Date(input.date_birth),
                full_name: input.full_name,
                username: input.username,
                city: city,
                email: input.email,
                password: input.password,
                description: input.description,
                profile_picture: input.profile_picture,
                header_picture: input.header_picture
            });
            await person.generatePasswordHash();
            
            return await this.repo.update(person);
        }

        async validate(input: Input) {
            if(!input.cpf) throw new RequiredError('cpf');
            if(!input.date_birth) throw new RequiredError('date_birth');
            if(!input.full_name) throw new RequiredError('full_name');
            if(!input.username) throw new RequiredError('username');
            if(!input.email) throw new RequiredError('email');
            if(!input.password) throw new RequiredError('password');
            if(!input.city) throw new RequiredError('city');
            
            const person = await this.repo.findById(input.id);

            if (!person) throw new NotFoundError("User not found");
            if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
            await this.repoLocalization.getCityByName(input.city.toUpperCase());

            const cpfExists = await this.repo.findByCpf(new CPF(input.cpf));
            const emailExists = await this.repo.findByEmail(input.email.toLowerCase());
            const usernameExists = await this.repo.findByUsername(input.username.toLowerCase());
            
            const id = person.getProps().id.getIdString();
            if (emailExists.id && emailExists.id !== id) throw new AlreadyExistsError('Email already exists');
            if (usernameExists.id && usernameExists.id !== id) throw new AlreadyExistsError('Username already exists');
            if (cpfExists.id && cpfExists.id !== id) throw new AlreadyExistsError('CPF already exists');
        }
    }

    export type Input = {
        id: string;
        cpf: string;
        date_birth: string;
        full_name: string;
        username: string;
        email: string;
        password: string;
        city: string;
        description?: string;
        profile_picture?: string;
        header_picture?: string;
    }

    export type Output = Promise<{
        id: string;
        name: string;
        email: string;
    }>
}
