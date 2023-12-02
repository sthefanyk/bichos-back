import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IAdoptRepository } from 'src/@core/domain/contracts';
import { Adopt } from 'src/@core/domain/entities/adopt/adopt';

export namespace AdoptFindById {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IAdoptRepository) {}

    async execute(input: Input): Output {
      const adopt = await this.repo.findById(input.id);

      if (!adopt) {
        throw new NotFoundError('Adopt not found');
      }

      return adopt;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Adopt>;
}
