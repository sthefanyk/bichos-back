import { IShelterRepository } from '../../../domain/contracts/shelter-repository.interface';
import UseCase from '../usecase';
import Shelter from '../../../domain/entities/users/shelter';
import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';

export namespace ShelterCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IShelterRepository,
      private repoLocalization: ILocalization,
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

      return await this.repo.insert(user);
    }

    async validate(input: Input) {
      if(!input.responsible_date_birth) throw new RequiredError('responsible_date_birth');
      if(!input.responsible_cpf) throw new RequiredError('responsible_cpf');
      if(!input.name_shelter) throw new RequiredError('name_shelter');
      if(!input.star_date_shelter) throw new RequiredError('star_date_shelter');
      if(!input.full_name) throw new RequiredError('full_name');
      if(!input.username) throw new RequiredError('username');
      if(!input.email) throw new RequiredError('email');
      if(!input.password) throw new RequiredError('password');
      if(!input.city) throw new RequiredError('city');

      if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
      await this.repoLocalization.getCityByName(input.city.toUpperCase());
      
      const cpfExists = await this.repo.findByCpf(new CPF(input.responsible_cpf));
      const nameShelterExists = await this.repo.findByNameShelter(input.name_shelter.toLowerCase());
      const emailExists = await this.repo.findByEmail(input.email.toLowerCase());
      const usernameExists = await this.repo.findByUsername(input.username.toLowerCase());
      
      if (emailExists.id) throw new AlreadyExistsError('Email already exists');
      if (usernameExists.id) throw new AlreadyExistsError('Username already exists');
      if (cpfExists.id) throw new AlreadyExistsError('CPF already exists');
      if (nameShelterExists.id) throw new AlreadyExistsError('Name shelter already exists');
    }
  }

  export type Input = {
    responsible_cpf: string;
    responsible_date_birth: string;
    name_shelter: string;
    star_date_shelter: string;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: string;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  };

  export type Output = Promise<{
    id: string;
    name: string;
    email: string;
    name_shelter: string;
  }>;
}
