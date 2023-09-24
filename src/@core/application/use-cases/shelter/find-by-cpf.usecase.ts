import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IShelterRepository } from 'src/@core/domain/contracts/shelter-repository.interface';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';

export namespace ShelterFindByCpf {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IShelterRepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findByCpf(new CPF(input.responsible_cpf));

      if (!user) {
        throw new NotFoundError('Shelter not found');
      }

      return user;
    }
  }

  export type Input = {
    responsible_cpf: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
