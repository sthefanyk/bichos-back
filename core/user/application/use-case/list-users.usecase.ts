import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../@seedwork/application/dto/pagination-output';
import { UseCase as DefaultUseCase } from '#seedwork/application/usecase';
import { SearchInputDto } from '../../../@seedwork/application/dto/search-input';
import UserRepository from '../../domain/repository/user.repository';
import { UserOutput } from '../dto/user-output.dto';

export namespace ListUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      return {
        items: searchResult.items.map((i) => i.toJSON()),
        ...PaginationOutputMapper.toOutput(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<UserOutput>;
}
