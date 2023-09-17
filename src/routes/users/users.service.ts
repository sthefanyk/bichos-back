import { Inject, Injectable } from '@nestjs/common';
import { UsersCollectionPresenter, UsersPresenter } from './users.presenter';
import { CreateUsersDto, UpdateUsersDto, SearchUsersDto } from './dto';
import {
  UserCreate,
  UserDelete,
  UserFindAll,
  UserFindById,
  UserSearch,
  UserUpdate,
  UserGetActiveRecords,
  UserGetInactiveRecords
} from 'src/@core/application/use-cases/user';

import UserProps from 'src/@core/domain/entities/user-props';

@Injectable()
export class UsersService {

  @Inject(UserCreate.Usecase)
  private createUseCase: UserCreate.Usecase;

  @Inject(UserFindAll.Usecase)
  private listUseCase: UserFindAll.Usecase;

  @Inject(UserGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: UserGetActiveRecords.Usecase;

  @Inject(UserGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: UserGetInactiveRecords.Usecase;

  @Inject(UserSearch.Usecase)
  private searchUseCase: UserSearch.Usecase;

  @Inject(UserFindById.Usecase)
  private getUseCase: UserFindById.Usecase;

  @Inject(UserUpdate.Usecase)
  private updateUseCase: UserUpdate.Usecase;

  @Inject(UserDelete.Usecase)
  private deleteUseCase: UserDelete.Usecase;

  async create(data: CreateUsersDto) {
    const props = new UserProps(data.name, data.email, data.password);
    return this.createUseCase.execute(props);
  }

  async findAll(searchParams: SearchUsersDto) {
    const output = await this.searchUseCase.execute(searchParams);
    return new UsersCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: SearchUsersDto) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new UsersCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: SearchUsersDto) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new UsersCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output;
    // return UsersService.usersToResponse(output);
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateUsersDto,
    });
    return output;
    // return UsersService.usersToResponse(output);
  }

  async remove(id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static usersToResponse(output: Output) {
    return new UsersPresenter(output);
  }
}

export type Output = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
