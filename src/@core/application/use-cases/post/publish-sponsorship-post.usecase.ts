import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { Post } from '../../../domain/entities/posts/post';
import { IPostRepository } from '../../../domain/contracts/post-repository.interface';
import { AnimalSponsorship } from '../../../domain/entities/posts/animal-sponsorship';
import { TypePost } from '../../../shared/domain/enums/type_post.enum';
import {
  IGalleryRepository,
  ILocalization,
  INeedRepository,
  IPersonalityRepository,
  IUserRepository,
} from '../../../domain/contracts';
import { Personality } from '../../../domain/entities/personality';
import { Need } from '../../../domain/entities/need';
import { Contact } from '../../../domain/entities/contact';

export namespace PublishSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPostRepository,
      private repoUser: IUserRepository,
      private repoPersonality: IPersonalityRepository,
      private repoNeed: INeedRepository,
      private repoLocalization: ILocalization,
      private repoGallery: IGalleryRepository,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const personalities: Personality[] = [];
      for (const personality of input.personalities) {
        const foundPersonality = await this.repoPersonality.findByName(
          personality.toLowerCase(),
        );
        personalities.push(foundPersonality);
      }

      const needs: Need[] = [];
      for (const need of input.needs) {
        const foundNeed = await this.repoNeed.findByName(need.toLowerCase());
        needs.push(foundNeed);
      }

      const city = await this.repoLocalization.getCityByName(
        input.contact.city.toUpperCase(),
      );
      if (!city) throw new NotFoundError('City not found');

      const user = await this.repoUser.findUserById(input.posted_by);
      if (!user) throw new NotFoundError('User not found');

      const post = new Post({
        urgent: input.urgent,
        urgency_justification: input.urgency_justification,
        posted_by: user,
        type: TypePost.SPONSORSHIP,
        animal: new AnimalSponsorship(
          {
            accompany: input.accompany,
            reason_request: input.reason_request,
            needs,
          },
          {
            name: input.name,
            sex: +input.sex,
            date_birth: new Date(input.date_birth),
            species: +input.species,
            history: input.history,
            characteristic: input.characteristic,
            personalities,
            main_image: { id: input.main_image },
            second_image: { id: input.second_image },
            third_image: { id: input.third_image },
            fourth_image: { id: input.fourth_image },
          },
        ),
        contact: new Contact({
          ...input.contact,
          phone: input.contact.phone,
          city,
        }),
      });

      return await this.repo.publishSponsorshipPost(post);
    }

    async validate(input: Input) {
      if (typeof input.urgent === 'undefined')
        throw new RequiredError('urgent');
      if (input.urgent == true && !input.urgency_justification)
        throw new RequiredError('urgency_justification');
      if (!input.posted_by) throw new RequiredError('posted_by');

      if (typeof input.accompany === 'undefined')
        throw new RequiredError('urgent');
      if (!input.reason_request) throw new RequiredError('reason_request');
      if (!input.name) throw new RequiredError('name');
      if (!input.sex) throw new RequiredError('sex');
      if (!input.date_birth) throw new RequiredError('date_birth');
      if (!input.species) throw new RequiredError('species');

      if (!(await this.repoGallery.findImageById(input.main_image)))
        throw new NotFoundError('Image main not found');
      if (!(await this.repoGallery.findImageById(input.second_image)))
        throw new NotFoundError('Image second not found');
      if (!(await this.repoGallery.findImageById(input.third_image)))
        throw new NotFoundError('Image third not found');
      if (!(await this.repoGallery.findImageById(input.fourth_image)))
        throw new NotFoundError('Image fourth not found');

      if (!input.personalities || input.personalities.length === 0)
        throw new RequiredError('personalities');
      if (!input.needs || input.needs.length === 0)
        throw new RequiredError('needs');

      if (!(await this.repoUser.findUserById(input.posted_by)))
        throw new NotFoundError('User not found');

      await this.validatePersonalities(input.personalities);
      await this.validateNeeds(input.needs);
    }

    async validatePersonalities(personalities: string[]) {
      for (const personality of personalities) {
        if (
          !(await this.repoPersonality.findByName(personality.toLowerCase()))
        ) {
          throw new NotFoundError(`Personality '${personality}' not found`);
        }
      }
    }

    async validateNeeds(needs: string[]) {
      for (const need of needs) {
        if (!(await this.repoNeed.findByName(need.toLowerCase()))) {
          throw new NotFoundError(`Need '${need}' not found`);
        }
      }
    }
  }

  export type Input = {
    urgent: boolean;
    urgency_justification?: string;
    posted_by: string;

    accompany: boolean;
    reason_request: string;
    needs: string[];
    name: string;
    sex: string;
    date_birth: string;
    species: string;
    characteristic: string;
    history: string;
    personalities: string[];

    main_image: string;
    second_image: string;
    third_image: string;
    fourth_image: string;

    contact: {
      name: string;
      email: string;
      phone: string;
      city: string;
    };
  };

  export type Output = Promise<{
    id: string;
  }>;
}
