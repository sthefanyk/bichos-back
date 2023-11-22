import {IPersonRepository} from "../../../domain/contracts/person-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";
import { IGalleryRepository, ILocalization } from "src/@core/domain/contracts";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { UpdateError } from "src/@core/shared/domain/errors/update.error";

export namespace PersonUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(
            private repo: IPersonRepository,
            private repoLocalization: ILocalization,
            private repoGallery: IGalleryRepository,
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
                name: input.name,
                city: city,
                email: input.email,
                description: input.description,
                profile_picture: input.profile_picture,
                header_picture: input.header_picture
            });

            const result = await this.repo.update(person);
            if (!result) 
                throw new UpdateError(`Could not update person with ID ${person.id}`);
            
            return result;
        }
        
        async validate(input: Input) {
            if(!input.cpf) throw new RequiredError('cpf');
            if(!input.date_birth) throw new RequiredError('date_birth');
            if(!input.full_name) throw new RequiredError('full_name');
            if(!input.username) throw new RequiredError('username');
            if(!input.name) throw new RequiredError('name');
            if(!input.email) throw new RequiredError('email');
            if(!input.city) throw new RequiredError('city');
            if(!input.profile_picture) throw new RequiredError('profile_picture');
            if(!input.header_picture) throw new RequiredError('header_picture');
            
            const person = await this.repo.findById(input.id);

            if (!person) throw new NotFoundError("User not found");

            if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
            if (!await this.repoGallery.findImageById(input.profile_picture)) throw new NotFoundError('Image profile not found');
            if (!await this.repoGallery.findImageById(input.header_picture)) throw new NotFoundError('Image header not found');
            
            const cpfExists = await this.repo.findByCpf(new CPF(input.cpf));
            const emailExists = await this.repo.findUserByEmail(input.email.toLowerCase());
            const usernameExists = await this.repo.findUserByUsername(input.username.toLowerCase());
            
            const id = person.id;
            if (emailExists && emailExists.id !== id) throw new AlreadyExistsError('Email already exists');
            if (usernameExists && usernameExists.id !== id) throw new AlreadyExistsError('Username already exists');
            if (cpfExists && cpfExists.id !== id) throw new AlreadyExistsError('CPF already exists');
        }
    }

    export type Input = {
        id: string;
        cpf: string;
        date_birth: string;
        full_name: string;
        username: string;
        name: string;
        email: string;
        city: string;
        description?: string;
        profile_picture?: string;
        header_picture?: string;
    }

    export type Output = Promise<{
        id: string;
    }>
}
