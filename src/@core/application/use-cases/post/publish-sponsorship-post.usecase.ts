import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { RequiredError } from 'src/@core/shared/domain/errors/required.error';
import { Post } from 'src/@core/domain/entities/posts/post';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { AnimalSponsorship } from 'src/@core/domain/entities/posts/animal-sponsorship';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import { ILocalization, INeedRepository, IPersonalityRepository, IUserRepository } from 'src/@core/domain/contracts';
import { Personality } from 'src/@core/domain/entities/personality';
import { Need } from 'src/@core/domain/entities/need';
import { Contact } from 'src/@core/domain/entities/contact';

export namespace PublishSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPostRepository,
      private repoUser: IUserRepository,
      private repoPersonality: IPersonalityRepository,
      private repoNeed: INeedRepository,
      private repoLocalization: ILocalization,
    ) {}

    async execute(input: Input): Output {
      await this.validate(input);

      const personalities: Personality[] = [];
      for (const personality of input.personalities) {
        const foundPersonality = await this.repoPersonality.findByName(personality.toLowerCase());
        personalities.push(foundPersonality);
      }

      const needs: Need[] = [];
      for (const need of input.needs) {
        const foundNeed = await this.repoNeed.findByName(need.toLowerCase());
        needs.push(foundNeed);
      }

      const city = await this.repoLocalization.getCityByName(input.contact.city.toUpperCase());
      if (!city) throw new NotFoundError('City not found');

      const post = new Post({
          urgent: input.urgent == "true",
          urgency_justification: input.urgency_justification,
          posted_by: input.posted_by,
          type: TypePost.SPONSORSHIP,
          animal: new AnimalSponsorship(
            {
              accompany: input.accompany == "true",
              reason_request: input.reason_request,
              needs,
              status: 0,
              update_status_at: new Date()
            },
            {
              name: input.name,
              sex: +input.sex,
              date_birth: new Date(input.date_birth),
              species: +input.species,
              history: input.history,
              characteristic: input.characteristic,
              personalities
            }
          ),
          contact: new Contact({
            ...input.contact,
            phone: input.contact.phone,
            city
          })
      });

      return await this.repo.publishSponsorshipPost(post);
    }

    async validate(input: Input) {
      if(!input.urgent) throw new RequiredError('urgent');
      if (input.urgent === "true" && !input.urgency_justification) throw new RequiredError('urgency_justification');
      if(!input.posted_by) throw new RequiredError('posted_by');

      if(!(input.accompany === "true" || input.accompany === "false")) throw new RequiredError('accompany');
      if(!input.reason_request) throw new RequiredError('reason_request');
      if(!input.name) throw new RequiredError('name');
      if(!input.sex) throw new RequiredError('sex');
      if(!input.date_birth) throw new RequiredError('date_birth');
      if(!input.species) throw new RequiredError('species');
      if(!input.personalities || input.personalities.length === 0) throw new RequiredError('personalities');
      if(!input.needs || input.needs.length === 0) throw new RequiredError('needs');

      if (!await this.repoUser.findUserById(input.posted_by)) 
        throw new NotFoundError('User not found');      
      
      await this.validatePersonalities(input.personalities);
      await this.validateNeeds(input.needs);
    }

    async validatePersonalities(personalities: string[]) {
      for (const personality of personalities) {
        if (!(await this.repoPersonality.findByName(personality.toLowerCase()))) {
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
    urgent: string;
    urgency_justification?: string;
    posted_by: string;

    accompany: string;
    reason_request: string;
    needs: string[];
    name: string;
    sex: string;
    date_birth: string;
    species: string;
    characteristic: string;
    history: string;
    personalities: string[];

    contact: {
      name: string;
      email: string;
      phone: string;
      city: string;
    }
  };

  export type Output = Promise<{
    id: string;
  }>;
}
