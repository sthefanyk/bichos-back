import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import UseCase from '../usecase';
import Person from '../../../domain/entities/users/person';
import { ILocalization } from 'src/@core/domain/contracts/localization-repository.interface';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';

export namespace PersonCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPersonRepository,
      private repoLocalization: ILocalization,
    ) {}

    async execute(input: Input): Output {
      if (!await this.repoLocalization.getCity(input.city.toUpperCase())) throw new NotFoundError('City not found');
      
      const city = await this.repoLocalization.getCityByName(input.city.toUpperCase());
      const cpf = new CPF(input.cpf);
      
      const cpfExists = await this.repo.findByCpf(cpf);
      const emailExists = await this.repo.findByEmail(input.email.toLowerCase());
      const usernameExists = await this.repo.findByUsername(input.username.toLowerCase());
      
      if (emailExists.id) throw new AlreadyExistsError('Email already exists');
      if (usernameExists.id) throw new AlreadyExistsError('Username already exists');
      if (cpfExists.id) throw new AlreadyExistsError('CPF already exists');
      
      const user = new Person(
        {
          cpf: cpf,
          date_birth: new Date(input.date_birth),
        },
        {
          full_name: input.full_name,
          username: input.username,
          email: input.email,
          password: input.password,
          city: city,
          description: input.description,
        },
      );

      await user.generatePasswordHash();
      return await this.repo.insert(user);
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
  };

  export type Output = Promise<{
    id: string;
    name: string;
    email: string;
  }>;
}
