import UseCase from '../usecase';
import NGO from '../../../domain/entities/users/ngo';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';
import { InsertError } from 'src/@core/shared/domain/errors/insert.error';
import {
  IGalleryRepository,
  ILocalization,
  INGORepository,
} from 'src/@core/domain/contracts';

export namespace NGOCreate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: INGORepository,
      private repoLocalization: ILocalization,
      private repoGallery: IGalleryRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const city = await this.repoLocalization.getCityByName(
        input.city.toUpperCase(),
      );
      const user = new NGO({
        cnpj: new CNPJ(input.cnpj),
        name_ngo: input.name_ngo,
        date_register: new Date(input.date_register),
        userAttr: {
          full_name: input.full_name,
          username: input.username,
          name: input.name,
          email: input.email,
          password: input.password,
          city: city,
          description: input.description,
          // profile_picture: { id: input.profile_picture },
          // header_picture: { id: input.header_picture },
        },
      });

      await user.generatePasswordHash();

      const result = await this.repo.insert(user);
      if (!result) throw new InsertError('Could not save user');

      return result;
    }

    async validate(input: Input) {
      if (!input.cnpj) throw new RequiredError('cnpj');
      if (!input.name_ngo) throw new RequiredError('name_ngo');
      if (!input.date_register) throw new RequiredError('date_register');
      if (!input.full_name) throw new RequiredError('full_name');
      if (!input.username) throw new RequiredError('username');
      if (!input.name) throw new RequiredError('name');
      if (!input.email) throw new RequiredError('email');
      if (!input.password) throw new RequiredError('password');
      if (!input.city) throw new RequiredError('city');
      // if(!input.profile_picture) throw new RequiredError('profile_picture');
      // if(!input.header_picture) throw new RequiredError('header_picture');

      if (!(await this.repoLocalization.getCity(input.city.toUpperCase())))
        throw new NotFoundError('City not found');
      // if (!await this.repoGallery.findImageById(input.profile_picture)) throw new NotFoundError('Image profile not found');
      // if (!await this.repoGallery.findImageById(input.header_picture)) throw new NotFoundError('Image header not found');

      await this.repoLocalization.getCityByName(input.city.toUpperCase());

      const cnpjExists = await this.repo.findByCnpj(new CNPJ(input.cnpj));
      const emailExists = await this.repo.findByEmail(
        input.email.toLowerCase(),
      );
      const usernameExists = await this.repo.findByUsername(
        input.username.toLowerCase(),
      );

      if (cnpjExists) throw new AlreadyExistsError('CNPJ already exists');
      if (emailExists) throw new AlreadyExistsError('Email already exists');
      if (usernameExists)
        throw new AlreadyExistsError('Username already exists');
    }
  }

  export type Input = {
    cnpj: string;
    name_ngo: string;
    date_register: string;
    full_name: string;
    username: string;
    name: string;
    email: string;
    password: string;
    city: string;
    description?: string;
    // profile_picture?: string;
    // header_picture?: string;
  };

  export type Output = Promise<{ id: string }>;
}
