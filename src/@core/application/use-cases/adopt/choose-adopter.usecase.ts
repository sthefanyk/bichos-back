import UseCase from '../usecase';
import { IAdoptRepository, IPostRepository } from 'src/@core/domain/contracts';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { UnauthorizedError } from 'src/@core/shared/domain/errors/unauthorized.error';

export namespace ChooseAdopter {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IAdoptRepository,
      private repoPost: IPostRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const adopt = await this.repo.findById(input.id_adopt);
      if (!adopt) throw new NotFoundError('Adopt not found');

      adopt.toAccept();

      await this.repo.updateStatus(adopt);
    }

    async validate(input: Input) {
      const adopt = await this.repo.findById(input.id_adopt);

      if (!adopt) throw new NotFoundError('Adopt not found');

      const post = await this.repoPost.findByIdAdoptPost(adopt.id_post);

      if (!post) throw new NotFoundError('Post not found');

      if (post.posted_by.id !== input.id)
        throw new UnauthorizedError('User not authorized');
    }
  }

  export type Input = {
    id: string;
    id_adopt: string;
  };

  export type Output = Promise<void>;
}
