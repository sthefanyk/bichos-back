import PersonalityInMemoryRepository from '#personality/infra/repository/in-memory/personality-in-memory.repository';
import PersonalityRepository from '#personality/domain/repository/personality.repository';
import { CreatePersonalityUseCase } from '#personality/application/use-cases/create-personality.usecase';
import { UpdatePersonalityUseCase } from '#personality/application/use-cases/update-personality.usecase';
import { ListPersonalitiesUseCase } from '#personality/application/use-cases/list-personalities.usecase';
import { DeletePersonalityUseCase } from '#personality/application/use-cases/delete-personality.usecase';
import { GetPersonalityUseCase } from '#personality/application/use-cases/get-personality.usecase';

export namespace PERSONALITY_PROVIDERS {
  export namespace REPOSITORIES {
    export const PERSONALITY_IN_MEMORY_REPOSITORY = {
      provide: 'PersonalityInMemoryRepository',
      useClass: PersonalityInMemoryRepository,
    };

    // export const PERSONALITY_SEQUELIZE_REPOSITORY = {
    //   provide: 'PersonalitySequelizeRepository',
    //   useFactory: (categoryModel: typeof PersonalitySequelize.PersonalityModel) => {
    //     return new PersonalitySequelize.PersonalityRepository(categoryModel);
    //   },
    //   inject: [getModelToken(PersonalitySequelize.PersonalityModel)],
    // };

    // export const PERSONALITY_REPOSITORY = {
    //   provide: 'PersonalityRepository',
    //   useExisting: 'PersonalitySequelizeRepository',
    // };

    export const PERSONALITY_REPOSITORY = {
      provide: 'PersonalityInMemoryRepository',
      useExisting: 'PersonalityInMemoryRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE_PERSONALITY_USE_CASE = {
      provide: CreatePersonalityUseCase.UseCase,
      useFactory: (categoryRepo: PersonalityRepository.Repository) => {
        return new CreatePersonalityUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const UPDATE_PERSONALITY_USE_CASE = {
      provide: UpdatePersonalityUseCase.UseCase,
      useFactory: (categoryRepo: PersonalityRepository.Repository) => {
        return new UpdatePersonalityUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListPersonalitiesUseCase.UseCase,
      useFactory: (categoryRepo: PersonalityRepository.Repository) => {
        return new ListPersonalitiesUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const GET_PERSONALITY_USE_CASE = {
      provide: GetPersonalityUseCase.UseCase,
      useFactory: (categoryRepo: PersonalityRepository.Repository) => {
        return new GetPersonalityUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const DELETE_PERSONALITY_USE_CASE = {
      provide: DeletePersonalityUseCase.UseCase,
      useFactory: (categoryRepo: PersonalityRepository.Repository) => {
        return new DeletePersonalityUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };
  }
}
