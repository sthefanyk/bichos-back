import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from 'src/core/user/application/use-case';
import UserRepository from 'src/core/user/domain/repository/user.repository';
import UserInMemoryRepository from 'src/core/user/infra/repository/in-memory/user-in-memory.repository';
import UserTypeormRepository from 'src/core/user/infra/repository/typeorm/user-typeorm.repository';

export namespace UsersProvider {
  export namespace Repositories {
    export const USER_IN_MEMORY_REPO = {
      provide: 'UserInMemoryRepository',
      useClass: UserInMemoryRepository,
    };

    export const USER_TYPEORM_REPO = {
      provide: 'UserTypeormRepository',
      useClass: UserTypeormRepository,
    };

    export const REPO = {
      provide: 'UserTypeormRepository',
      useExisting: 'UserTypeormRepository',
    };
  }

  export namespace UseCases {
    export const CREATE = {
      provide: CreateUserUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new CreateUserUseCase.UseCase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const GET = {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const LIST = {
      provide: ListUsersUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new ListUsersUseCase.UseCase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const UPDATE = {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };

    export const DELETE = {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(userRepo);
      },
      inject: [Repositories.REPO.provide],
    };
  }
}
