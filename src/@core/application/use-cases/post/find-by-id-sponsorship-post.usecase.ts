import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { IPostRepository } from '../../../domain/contracts/post-repository.interface';
import { Post } from '../../../domain/entities/posts/post';

export namespace FindByIdSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(input: Input): Output {
      const post = await this.repo.findByIdSponsorshipPost(input.id);

      if (!post) {
        throw new NotFoundError('Post not found');
      }

      return post;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Post>;
}
