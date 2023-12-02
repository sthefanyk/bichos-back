import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import { PersonUpdate } from './update.usecase';
import { UnauthorizedError } from '../../../shared/domain/errors/unauthorized.error';

export namespace PersonInactivate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonRepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findById(input.id);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.id !== input.id)
        throw new UnauthorizedError('User not authorized');

      user.deactivate();

      return await this.repo.update(user);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = PersonUpdate.Output;
}
