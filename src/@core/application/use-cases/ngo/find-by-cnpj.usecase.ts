import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { INGORepository } from 'src/@core/domain/contracts/ngo-repository.interface';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';

export namespace NGOFindByCnpj {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: INGORepository) {}

    async execute(input: Input): Output {
      const user = await this.repo.findByCnpj(new CNPJ(input.cnpj));

      if (!user) {
        throw new NotFoundError('NGO not found');
      }

      return user;
    }
  }

  export type Input = {
    cnpj: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
