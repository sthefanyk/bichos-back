import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import CPF from '../../../shared/domain/value-objects/cpf.vo';
import User from '../../../domain/entities/users/user';

export namespace PersonFindByCpf {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPersonRepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findByCpf(new CPF(input.cpf));

      if (!user) {
        throw new NotFoundError('Person not found');
      }

      return user;
    }
  }

  export type Input = {
    cpf: string;
  };

  export type Output = Promise<User>;
}
