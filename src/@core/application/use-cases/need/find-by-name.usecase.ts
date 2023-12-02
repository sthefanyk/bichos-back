import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { INeedRepository } from 'src/@core/domain/contracts';
import { Need } from 'src/@core/domain/entities/need';

export namespace NeedFindByName {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INeedRepository) {}

    async execute(input: Input): Output {
      const need = await this.repo.findByName(input.name);

      if (!need) {
        throw new NotFoundError('Need not found');
      }

      return need;
    }
  }

  export type Input = {
    name: string;
  };

  export type Output = Promise<Need>;
}
