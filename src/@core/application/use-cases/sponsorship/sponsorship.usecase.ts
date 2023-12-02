import UseCase from '../usecase';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import {
  ISponsorshipRepository,
  IPostRepository,
  IUserRepository,
} from '../../../domain/contracts';
import { Sponsorship as SponsorshipEntity } from '../../../domain/entities/sponsorship/sponsorship';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export namespace SponsorshipUsecase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: ISponsorshipRepository,
      private repoPost: IPostRepository,
      private repoUser: IUserRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const sponsorship = new SponsorshipEntity(input);

      return await this.repo.sponsorship(sponsorship);
    }

    async validate(input: Input) {
      if (!input.id_godfather) throw new RequiredError('id_godfather');
      if (!input.id_post) throw new RequiredError('id_post');

      if (!(await this.repoUser.findUserById(input.id_godfather)))
        throw new NotFoundError('No user found');

      if (!(await this.repoPost.findByIdSponsorshipPost(input.id_post)))
        throw new NotFoundError('No post found');
    }
  }

  export type Input = {
    id_godfather: string;
    id_post: string;
  };

  export type Output = Promise<{
    id: string;
    name: string;
    email: string;
    phone: string;
    needs: string[];
    urgent: boolean;
    city: {
      name: string;
      state: {
        name: string;
        abbreviation: string;
      };
    };
  }>;
}
