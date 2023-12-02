import User from '../../../domain/entities/users/user';
import UseCase from '../usecase';
import { IAdoptRepository } from '../../../domain/contracts';

export namespace GetAdopterByAdoptPostId {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IAdoptRepository) {}

    async execute(input: Input): Output {
      return await this.repo.getAdopterByAdoptPostId(input.id_post);
    }
  }

  export type Input = {
    id_post: string;
  };

  export type Output = Promise<User>;
}
