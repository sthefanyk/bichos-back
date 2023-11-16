import UseCase from '../usecase';
import {
  SearchParams as SP,
  SortDirection,
} from '../../services/search/search-params';
import {
  SearchInputDto,
  SearchOutputDto,
  SearchOutputMapper,
  SearchService,
} from '../../services/search';
import { SearchResult as SR } from '../../services/search/search-result';
import { IQuizRepository } from 'src/@core/domain/contracts/quiz-repository.interface';
import { Quiz, QuizAttr } from 'src/@core/domain/entities/quiz/quiz';

export namespace SearchQuiz {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IQuizRepository) {}

    async execute(input: Input) : Promise<Output> {
      const quiz = await this.repo.findAllQuiz();
      const service = new ServiceConfig(quiz, ['title', 'created_at']);

      const params = new SearchParams(input);

      const searchResult = await service.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: SearchResult): Output | any {
      return {
        items: searchResult.items.map((i) => i.toJson()),
        ...SearchOutputMapper.toOutput<Quiz>(searchResult),
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = SearchOutputDto<QuizAttr>;

  export type Filter = string;
  export class SearchParams extends SP<Filter> {}
  export class SearchResult extends SR<Quiz, Filter> {}
  class ServiceConfig extends SearchService<Quiz> {
    protected async applyFilter(
      items: Quiz[],
      filter: string | null,
    ): Promise<Quiz[]> {
      if (!filter) {
        return items;
      }

      return items.filter((i) => {
        return i.title.toLowerCase().includes(filter.toLowerCase());
      });
    }

    protected async applySort(
      items: Quiz[],
      sort: string | null,
      sort_dir: SortDirection | null,
    ): Promise<Quiz[]> {
      return !sort
        ? super.applySort(items, 'created_at', 'desc')
        : super.applySort(items, sort, sort_dir);
    }
  }
}
