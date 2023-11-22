import {IShelterRepository} from "../../../domain/contracts/shelter-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";
import { IGalleryRepository, ILocalization } from "src/@core/domain/contracts";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { UpdateError } from "src/@core/shared/domain/errors/update.error";

export namespace ShelterUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(
            private repo: IShelterRepository,
            private repoLocalization: ILocalization,
            private repoGallery: IGalleryRepository,
        ) {}

        async execute(input: Input): Output {
            await this.validate(input);

            const shelter = await this.repo.findById(input.id);
            const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
            shelter.update({
                responsible_cpf: input.responsible_cpf,
                responsible_date_birth: new Date(input.responsible_date_birth),
                name_shelter: input.name_shelter,
                star_date_shelter: new Date(input.star_date_shelter),
                full_name: input.full_name,
                username: input.username,
                name: input.name,
                city: city,
                email: input.email,
                description: input.description,
                profile_picture: input.profile_picture,
                header_picture: input.header_picture,
            });

            const result = await this.repo.update(shelter);
            if (!result) throw new UpdateError(`Could not update shelter with ID ${shelter.id}`);
            
            return result;
        }

        async validate(input: Input) {
            if(!input.responsible_date_birth) throw new RequiredError('responsible_date_birth');
            if(!input.responsible_cpf) throw new RequiredError('responsible_cpf');
            if(!input.name_shelter) throw new RequiredError('name_shelter');
            if(!input.star_date_shelter) throw new RequiredError('star_date_shelter');
            if(!input.full_name) throw new RequiredError('full_name');
            if(!input.username) throw new RequiredError('username');
            if(!input.name) throw new RequiredError('name');
            if(!input.email) throw new RequiredError('email');
            if(!input.city) throw new RequiredError('city');
            if(!input.profile_picture) throw new RequiredError('profile_picture');
            if(!input.header_picture) throw new RequiredError('header_picture');
            
            const shelter = await this.repo.findById(input.id);
            if (!shelter) throw new NotFoundError("User not found");

            if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
            if (!await this.repoGallery.findImageById(input.profile_picture)) throw new NotFoundError('Image profile not found');
            if (!await this.repoGallery.findImageById(input.header_picture)) throw new NotFoundError('Image header not found');
      
            await this.repoLocalization.getCityByName(input.city.toUpperCase());
            const responsible_cpf = new CPF(input.responsible_cpf);

            const cpfExists = await this.repo.findByCpf(responsible_cpf);
            const nameShelterExists = await this.repo.findByNameShelter(input.name_shelter.toLowerCase());
            const emailExists = await this.repo.findUserByEmail(input.email.toLowerCase());
            const usernameExists = await this.repo.findUserByUsername(input.username.toLowerCase());
            
            const id = shelter.id;
            if (emailExists && emailExists.id !== id) throw new AlreadyExistsError('Email already exists');
            if (nameShelterExists && nameShelterExists.id !== id) throw new AlreadyExistsError('Name shelter already exists');
            if (usernameExists && usernameExists.id !== id) throw new AlreadyExistsError('Username already exists');
            if (cpfExists && cpfExists.id !== id) throw new AlreadyExistsError('CPF already exists');
        }
    }

    export type Input = {
        id: string;
        responsible_cpf: string;
        responsible_date_birth: string;
        name_shelter: string;
        star_date_shelter: string;
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
