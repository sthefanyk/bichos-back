import PersonalityInMemoryRepository from '#personality/infra/repository/in-memory/personality-in-memory.repository';
import PersonalityRepository from '#personality/domain/repository/personality.repository';
import {
  CreatePersonalityUseCase,
  UpdatePersonalityUseCase,
  ListPersonalitiesUseCase,
  DeletePersonalityUseCase,
  GetPersonalityUseCase,
} from '#personality/application/use-cases';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import PersonalityTypeormRepository from '#personality/infra/repository/typeorm/personality-typeorm.repository';
import { Personality } from '#personality/infra/repository/typeorm/personality.model';

export namespace PERSONALITY_PROVIDERS {
  export namespace REPOSITORIES {
    export const PERSONALITY_IN_MEMORY_REPOSITORY = {
      provide: 'PersonalityInMemoryRepository',
      useClass: PersonalityInMemoryRepository,
    };

    // export const PERSONALITY_SEQUELIZE_REPOSITORY = {
    //   provide: 'PersonalitySequelizeRepository',
    //   useFactory: (personalityModel: typeof PersonalitySequelize.PersonalityModel) => {
    //     return new PersonalitySequelize.PersonalityRepository(personalityModel);
    //   },
    //   inject: [getModelToken(PersonalitySequelize.PersonalityModel)],
    // };

    export const PERSONALITY_TYPEORM_REPO = {
      provide: 'PersonalityTypeormRepository',
      useFactory: (dataSource: DataSource) =>{
        return new PersonalityTypeormRepository(dataSource.getRepository(Personality));
      },
      inject: [getDataSourceToken()]
    };

    export const PERSONALITY_REPOSITORY = {
      provide: 'PersonalityTypeormRepository',
      useExisting: 'PersonalityTypeormRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE_PERSONALITY_USE_CASE = {
      provide: CreatePersonalityUseCase.UseCase,
      useFactory: (personalityRepo: PersonalityRepository.Repository) => {
        return new CreatePersonalityUseCase.UseCase(personalityRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const UPDATE_PERSONALITY_USE_CASE = {
      provide: UpdatePersonalityUseCase.UseCase,
      useFactory: (personalityRepo: PersonalityRepository.Repository) => {
        return new UpdatePersonalityUseCase.UseCase(personalityRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListPersonalitiesUseCase.UseCase,
      useFactory: (personalityRepo: PersonalityRepository.Repository) => {
        return new ListPersonalitiesUseCase.UseCase(personalityRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const GET_PERSONALITY_USE_CASE = {
      provide: GetPersonalityUseCase.UseCase,
      useFactory: (personalityRepo: PersonalityRepository.Repository) => {
        return new GetPersonalityUseCase.UseCase(personalityRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };

    export const DELETE_PERSONALITY_USE_CASE = {
      provide: DeletePersonalityUseCase.UseCase,
      useFactory: (personalityRepo: PersonalityRepository.Repository) => {
        return new DeletePersonalityUseCase.UseCase(personalityRepo);
      },
      inject: [REPOSITORIES.PERSONALITY_REPOSITORY.provide],
    };
  }
}
