import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import UseCase from '../usecase';
import { IPostRepository } from '../../../domain/contracts/post-repository.interface';
import { TypePost } from '../../../shared/domain/enums/type_post.enum';
import { InvalidStatusError } from '../../../shared/domain/errors/invalid-status';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { Post } from '../../../domain/entities/posts/post';

export namespace PostInactivate {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const postModel = await this.repo.findByIdPost(input.id);

      if (!postModel) {
        throw new NotFoundError('Post not found');
      }

      let post: Post;

      if (+postModel.type === TypePost.ADOPTION) {
        post = (await this.repo.findByIdAdoptPost(input.id)) as any;
      } else if (+postModel.type === TypePost.SPONSORSHIP) {
        post = (await this.repo.findByIdSponsorshipPost(input.id)) as any;
      } else {
        throw new InvalidStatusError();
      }

      if (!post) {
        throw new NotFoundError('Post not found');
      }

      post.inactivate();

      return await this.repo.inactivate(post);
    }

    async validate(input: Input) {
      if (!input.id) throw new RequiredError('id');
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<{
    id: string;
    type: TypePost;
  }>;
}
