import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import UseCase from '../usecase';
import Person from '../../../domain/entities/users/person';
import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';

export namespace PersonCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPersonRepository,
      private repoLocalization: ILocalization,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);
           
      const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
      const user = new Person(
        {
          cpf: new CPF(input.cpf),
          date_birth: new Date(input.date_birth),
        },
        {
          full_name: input.full_name,
          username: input.username,
          email: input.email,
          password: input.password,
          city: city,
          description: input.description,
          profile_picture: input.profile_picture,
          header_picture: input.header_picture,
        },
      );

      await user.generatePasswordHash();
      return await this.repo.insert(user);
    }

    async validate(input: Input) {
      if(!input.cpf) throw new RequiredError('cpf');
      if(!input.date_birth) throw new RequiredError('date_birth');
      if(!input.full_name) throw new RequiredError('full_name');
      if(!input.username) throw new RequiredError('username');
      if(!input.email) throw new RequiredError('email');
      if(!input.password) throw new RequiredError('password');
      if(!input.city) throw new RequiredError('city');

      if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
      await this.repoLocalization.getCityByName(input.city.toUpperCase());
      
      const cpfExists = await this.repo.findByCpf(new CPF(input.cpf));
      const emailExists = await this.repo.findByEmail(input.email.toLowerCase());
      const usernameExists = await this.repo.findByUsername(input.username.toLowerCase());
      
      if (emailExists.id) throw new AlreadyExistsError('Email already exists');
      if (usernameExists.id) throw new AlreadyExistsError('Username already exists');
      if (cpfExists.id) throw new AlreadyExistsError('CPF already exists');
    }
  }

  export type Input = {
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
  };

  export type Output = Promise<{
    id: string;
    name: string;
    email: string;
  }>;
}
