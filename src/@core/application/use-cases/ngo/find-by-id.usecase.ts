import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { INGORepository } from '../../../domain/contracts/ngo-repository.interface';
import NGO from '../../../domain/entities/users/ngo';

export namespace NGOFindById {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INGORepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findById(input.id);

      if (!user) {
        throw new NotFoundError('NGO not found');
      }

      return user;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<NGO>;
}
