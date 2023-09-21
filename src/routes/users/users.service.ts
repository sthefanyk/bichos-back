import { Inject, Injectable } from '@nestjs/common';
import { UsersCollectionPresenter, UsersPresenter } from './users.presenter';
import { CreateUsersDto, UpdateUsersDto, SearchUsersDto } from './dto';
import {
  PersonCreate,
  PersonDelete,
  PersonFindAll,
  PersonFindById,
  PersonSearch,
  PersonUpdate,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
} from 'src/@core/application/use-cases/person';

// import UserProps from 'src/@core/domain/entities/users/user-props';

import { City } from 'src/@core/domain/entities/localization/city';
import { State } from 'src/@core/domain/entities/localization/state';

@Injectable()
export class UsersService {
  @Inject(PersonCreate.Usecase)
  private createUseCase: PersonCreate.Usecase;

  @Inject(PersonCreate.Usecase)
  private createPersonUseCase: PersonCreate.Usecase;

  @Inject(PersonFindAll.Usecase)
  private listUseCase: PersonFindAll.Usecase;

  @Inject(PersonFindAll.Usecase)
  private listPersonUseCase: PersonFindAll.Usecase;

  @Inject(PersonGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: PersonGetActiveRecords.Usecase;

  @Inject(PersonGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: PersonGetInactiveRecords.Usecase;

  @Inject(PersonSearch.Usecase)
  private searchUseCase: PersonSearch.Usecase;

  @Inject(PersonFindById.Usecase)
  private getUseCase: PersonFindById.Usecase;

  @Inject(PersonUpdate.Usecase)
  private updateUseCase: PersonUpdate.Usecase;

  @Inject(PersonDelete.Usecase)
  private deleteUseCase: PersonDelete.Usecase;

  async create(data: Input) {
    // const props = new UserProps(data.name, data.email, data.password, data.role);
    return "oi"
  }

  async findAll(searchParams: SearchUsersDto) {
    const output = await this.searchUseCase.execute(searchParams);
    return new UsersCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: SearchUsersDto) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return output
    // return new UsersCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: SearchUsersDto) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return output

    // return new UsersCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    // return UsersService.usersToResponse(output.toJson());
    return output;
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    // await this.updateUseCase.execute({
    //   id,
    //   ...updateUsersDto,
    // });
    return id;
  }

  async remove(id: string) {
    return this.deleteUseCase.execute({ id });
  }

  // static usersToResponse(output: Output) {
  //   return new UsersPresenter(output);
  // }
}

export type Input = {
  cpf: string;
  date_birth: Date;
  fullName: string;
  username: string;
  email: string;
  password: string;
  city: string;
  state: string;
  state_abbr: string;
  role: number;
  description?: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type Output = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
