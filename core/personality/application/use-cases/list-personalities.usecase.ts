import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../@seedwork/application/dto/pagination-output';
import { UseCase as DefaultUseCase } from '../../../@seedwork/application/usecase';
import PersonalityRepository from '../../domain/repository/personality.repository';
import { PersonalityOutput } from '../dto/personality-output.dto';
import { SearchInputDto } from '../../../@seedwork/application/dto/search-input';

export namespace ListPersonalitiesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private personalityRepository: PersonalityRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const params = new PersonalityRepository.SearchParams(input);
      const searchResult = await this.personalityRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: PersonalityRepository.SearchResult): Output {
      return {
        items: searchResult.items.map((i) => i.toJSON()),
        ...PaginationOutputMapper.toOutput(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<PersonalityOutput>;
}
