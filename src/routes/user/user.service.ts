import { Injectable, Inject } from '@nestjs/common';
import { UserSearch } from 'src/@core/application/use-cases/user';
import { UserFindById } from 'src/@core/application/use-cases/user/find-by-id.usecase';
import { UserCollectionPresenter } from './user.presenter';

@Injectable()
export class UserService {
  @Inject(UserFindById.Usecase)
  private getUseCase: UserFindById.Usecase;

  @Inject(UserSearch.Usecase)
  private userSearchUseCase: UserSearch.Usecase;

  async findOne(id: string) {
    const user = await this.getUseCase.execute({ id });
    return user.toJson();
  }

  async search(searchParams: UserSearch.Input) {
    const output = await this.userSearchUseCase.execute(searchParams);
    return new UserCollectionPresenter(output);
  }
}
