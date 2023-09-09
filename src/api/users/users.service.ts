import { Inject, Injectable } from '@nestjs/common';
import { CreateUserUseCase, DeleteUserUseCase, GetUserUseCase, ListUsersUseCase, UpdateUserUseCase } from 'src/core/user/application/use-case';
import { UsersCollectionPresenter, UsersPresenter } from './users.presenter';
import { UserOutput } from 'src/core/user/application/dto/user-output.dto';
import { CreateUsersDto, UpdateUsersDto, SearchUsersDto } from './dto';

@Injectable()
export class UsersService {

  @Inject(CreateUserUseCase.UseCase)
  private createUseCase: CreateUserUseCase.UseCase;

  @Inject(ListUsersUseCase.UseCase)
  private listUseCase: ListUsersUseCase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUseCase: GetUserUseCase.UseCase;

  @Inject(UpdateUserUseCase.UseCase)
  private updateUseCase: UpdateUserUseCase.UseCase;

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUseCase: DeleteUserUseCase.UseCase;

  async create(data: CreateUsersDto) {
    return this.createUseCase.execute(data);
  }

  async findAll(searchParams: SearchUsersDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new UsersCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return UsersService.usersToResponse(output);
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateUsersDto,
    });
    return UsersService.usersToResponse(output);
  }

  remove(id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static usersToResponse(output: UserOutput) {
    return new UsersPresenter(output);
  }
}
