import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error copy';
import IUserRepository from 'src/@core/domain/contracts/user-repository.interface';
import { Post } from 'src/@core/domain/entities/posts/post';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';

export namespace PublishPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPostRepository,
      private repoUser: IUserRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const post = new Post({
        urgent: input.urgent == "true",
        urgency_justification: input.urgency_justification,
        posted_by: new UUID(input.posted_by),
        type: +input.type,
      });

      return await this.repo.publishPost(post);
    }

    async validate(input: Input) {
      if(!input.urgent) throw new RequiredError('urgent');
      if (input.urgent == "true" && !input.urgency_justification) throw new RequiredError('urgency_justification');
      if(!input.posted_by) throw new RequiredError('posted_by');
      if(!input.type) throw new RequiredError('type');

      if (!await this.repoUser.findUserById(input.posted_by)) throw new NotFoundError('User not found');      
    }
  }

  export type Input = {
    urgent: string;
    urgency_justification?: string;
    posted_by: string;
    type: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
