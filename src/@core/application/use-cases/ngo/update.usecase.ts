import {INGORepository} from "../../../domain/contracts/ngo-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";
import { ILocalization } from "src/@core/domain/contracts";
import CNPJ from "src/@core/shared/domain/value-objects/cnpj.vo";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { UpdateError } from "src/@core/shared/domain/errors/update.error";

export namespace NGOUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(
            private repo: INGORepository,
            private repoLocalization: ILocalization,
        ) {}

        async execute(input: Input): Output {
            await this.validate(input);

            const ngo = await this.repo.findById(input.id);
            const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
            ngo.update({
                cnpj: new CNPJ(input.cnpj),
                name_ngo: input.name_ngo,
                date_register: new Date(input.date_register),
                full_name: input.full_name,
                username: input.username,
                name: input.name,
                city: city,
                email: input.email,
                description: input.description,
                profile_picture: input.profile_picture,
                header_picture: input.header_picture
            });

            const result = await this.repo.update(ngo);
            if (!result) throw new UpdateError(`Could not update ngo with ID ${ngo.id}`);
            
            return result;
        }

        async validate(input: Input) {
            if(!input.cnpj) throw new RequiredError('cnpj');
            if(!input.name_ngo) throw new RequiredError('name_ngo');
            if(!input.date_register) throw new RequiredError('date_register');
            if(!input.full_name) throw new RequiredError('full_name');
            if(!input.username) throw new RequiredError('username');
            if(!input.name) throw new RequiredError('name');
            if(!input.email) throw new RequiredError('email');
            if(!input.city) throw new RequiredError('city');
            
            const ngo = await this.repo.findById(input.id);

            if (!ngo) throw new NotFoundError("User not found");
            if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
            await this.repoLocalization.getCityByName(input.city.toUpperCase());

            const cnpjExists = await this.repo.findByCnpj(new CNPJ(input.cnpj));
            const emailExists = await this.repo.findUserByEmail(input.email.toLowerCase());
            const usernameExists = await this.repo.findUserByUsername(input.username.toLowerCase());
            
            const id = ngo.id;
            if (emailExists && emailExists.id !== id) throw new AlreadyExistsError('Email already exists');
            if (usernameExists && usernameExists.id !== id) throw new AlreadyExistsError('Username already exists');
            if (cnpjExists && cnpjExists.id !== id) throw new AlreadyExistsError('CNPJ already exists');
        }
    }

    export type Input = {
        id: string;
        cnpj: string;
        name_ngo: string;
        date_register: string;
        full_name: string;
        username: string;
        name: string;
        email: string;
        city: string;
        description?: string;
        profile_picture?: string;
        header_picture?: string;
    }

    export type Output = Promise<{ id: string }>;
}
