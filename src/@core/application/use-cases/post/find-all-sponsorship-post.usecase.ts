import { IPostRepository } from '../../../domain/contracts/post-repository.interface';
import UseCase from '../usecase';
import { Post } from '../../../domain/entities/posts/post';

export namespace FindAllSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(): Output {
      return await this.repo.findAllSponsorshipPost();
    }
  }

  export type Input = null;

  export type Output = Promise<Post[]>;
}
