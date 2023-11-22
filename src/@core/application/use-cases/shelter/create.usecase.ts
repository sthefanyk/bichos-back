import UseCase from '../usecase';
import Shelter from '../../../domain/entities/users/shelter';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import { InsertError } from 'src/@core/shared/domain/errors/insert.error';
import { IGalleryRepository, ILocalization, IShelterRepository } from 'src/@core/domain/contracts';

export namespace ShelterCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IShelterRepository,
      private repoLocalization: ILocalization,
      private repoGallery: IGalleryRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);
      const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());      
      const user = new Shelter(
        {
          responsible_cpf: new CPF(input.responsible_cpf),
          responsible_date_birth: new Date(input.responsible_date_birth),
          name_shelter: input.name_shelter,
          star_date_shelter: new Date(input.star_date_shelter),
          userAttr: {
            full_name: input.full_name,
            username: input.username,
            name: input.name,
            email: input.email,
            password: input.password,
            city: city,
            description: input.description,
            profile_picture: input.profile_picture,
            header_picture: input.header_picture,
          }
        }
      );

      await user.generatePasswordHash();

      const result = await this.repo.insert(user);
      if (!result) throw new InsertError('Could not save user');

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
      if(!input.password) throw new RequiredError('password');
      if(!input.city) throw new RequiredError('city');
      if(!input.profile_picture) throw new RequiredError('profile_picture');
      if(!input.header_picture) throw new RequiredError('header_picture');

      if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      if (!await this.repoGallery.findImageById(input.profile_picture)) throw new NotFoundError('Image profile not found');
      if (!await this.repoGallery.findImageById(input.header_picture)) throw new NotFoundError('Image header not found');
      
      await this.repoLocalization.getCityByName(input.city.toUpperCase());
      
      const cpfExists = await this.repo.findByCpf(new CPF(input.responsible_cpf));
      const emailExists = await this.repo.findUserByEmail(input.email.toLowerCase());
      const usernameExists = await this.repo.findUserByUsername(input.username.toLowerCase());
      const nameShelterExists = await this.repo.findByNameShelter(input.name_shelter.toLowerCase());
      
      if (emailExists) throw new AlreadyExistsError('Email already exists');
      if (usernameExists) throw new AlreadyExistsError('Username already exists');
      if (cpfExists) throw new AlreadyExistsError('CPF already exists');
      if (nameShelterExists) throw new AlreadyExistsError('Name shelter already exists');
    }
  }

  export type Input = {
    responsible_cpf: string;
    responsible_date_birth: string;
    name_shelter: string;
    star_date_shelter: string;
    full_name: string;
    username: string;
    name: string;
    email: string;
    password: string;
    city: string;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  };

  export type Output = Promise<{ id: string }>;
}
