import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import IUserRepository from 'src/@core/domain/contracts/user-repository.interface';
import { Post } from 'src/@core/domain/entities/posts/post';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { AnimalAdopt } from 'src/@core/domain/entities/posts/animal-adopt';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';

export namespace PublishAdoptPost {
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
          type: TypePost.ADOPTION,
          animal: new AnimalAdopt(
          {
            size_current: +input.size_current,
            size_estimated: +input.size_estimated,
          },
          {
            name: input.name,
            sex: +input.sex,
            date_birth: new Date(input.date_birth),
            species: +input.species,
            history: input.history,
            characteristic: input.characteristic
          }
          )
      });

      return await this.repo.publishAdoptPost(post);
    }

    async validate(input: Input) {
      if(!input.urgent) throw new RequiredError('urgent');
      if (input.urgent == "true" && !input.urgency_justification) throw new RequiredError('urgency_justification');
      if(!input.posted_by) throw new RequiredError('posted_by');

      if(!input.size_current) throw new RequiredError('size');
      if(!input.size_estimated) throw new RequiredError('size');
      if(!input.name) throw new RequiredError('name');
      if(!input.sex) throw new RequiredError('sex');
      if(!input.date_birth) throw new RequiredError('date_birth');
      if(!input.species) throw new RequiredError('species');

      if (!await this.repoUser.findUserById(input.posted_by)) throw new NotFoundError('User not found');      
    }
  }

  export type Input = {
    urgent: string;
    urgency_justification?: string;
    posted_by: string;

    size_current: string;
    size_estimated: string;
    name: string;
    sex: string;
    date_birth: string;
    species: string;
    characteristic: string;
    history: string;
  };

  export type Output = Promise<{
    id: string;
  }>;
}
