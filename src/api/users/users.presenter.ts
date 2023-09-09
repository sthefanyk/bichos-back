import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { UserOutput } from 'src/core/user/application/dto/user-output.dto';
import { ListUsersUseCase } from 'src/core/user/application/use-case';

export class UsersPresenter {
  id: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.password = output.password;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class UsersCollectionPresenter extends CollectionPresenter {
  data: UsersPresenter[];

  constructor(output: ListUsersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new UsersPresenter(item));
  }
}
