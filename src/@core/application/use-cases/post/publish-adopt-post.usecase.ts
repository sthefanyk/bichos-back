import UseCase from '../usecase';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { RequiredError } from '../../../shared/domain/errors/required.error';
import { Post } from '../../../domain/entities/posts/post';
import { IPostRepository } from '../../../domain/contracts/post-repository.interface';
import { AnimalAdopt } from '../../../domain/entities/posts/animal-adopt';
import { TypePost } from '../../../shared/domain/enums/type_post.enum';
import {
  IBreedRepository,
  IGalleryRepository,
  ILocalization,
  IPersonalityRepository,
  IUserRepository,
} from '../../../domain/contracts';
import { Personality } from '../../../domain/entities/personality';
import { Health } from '../../../domain/entities/health/health';
import { DiseaseAllergy } from '../../../domain/entities/health/disease-allergy';
import { VaccineMedicine } from '../../../domain/entities/health/vaccine-medicine';
import { Dose } from '../../../domain/entities/health/dose';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { Contact } from '../../../domain/entities/contact';

export namespace PublishAdoptPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
      private repo: IPostRepository,
      private repoUser: IUserRepository,
      private repoPersonality: IPersonalityRepository,
      private repoBreed: IBreedRepository,
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
        type: TypePost.ADOPTION,
        animal: new AnimalAdopt(
          {
            size_current: +input.size_current,
            size_estimated: +input.size_estimated,
            breed: input.breed,
            health: this.createHealth(input),
          },
          {
            name: input.name,
            sex: +input.sex,
            date_birth: new Date(input.date_birth),
            species: +input.specie,
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

      return await this.repo.publishAdoptPost(post);
    }

    async validate(input: Input) {
      if (typeof input.urgent === 'undefined')
        throw new RequiredError('urgent');
      if (input.urgent == true && !input.urgency_justification)
        throw new RequiredError('urgency_justification');
      if (!input.posted_by) throw new RequiredError('posted_by');

      if (typeof input.size_current === 'undefined')
        throw new RequiredError('size');
      if (typeof input.size_estimated === 'undefined')
        throw new RequiredError('size');
      if (!input.breed) throw new RequiredError('breed');
      if (!input.name) throw new RequiredError('name');
      if (typeof input.sex === 'undefined') throw new RequiredError('sex');
      if (!input.date_birth) throw new RequiredError('date_birth');
      if (typeof input.specie === 'undefined')
        throw new RequiredError('species');
      if (!input.main_image) throw new RequiredError('main_image');
      if (!input.second_image) throw new RequiredError('second_image');
      if (!input.third_image) throw new RequiredError('third_image');
      if (!input.fourth_image) throw new RequiredError('fourth_image');

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

      const breed = await this.repoBreed.findByName(input.breed.toLowerCase());
      if (!breed || breed.specie !== +input.specie)
        throw new NotFoundError('Breed not found');

      if (!(await this.repoUser.findUserById(input.posted_by)))
        throw new NotFoundError('User not found');

      await this.validatePersonalities(input.personalities);
      this.validateHealth(input);
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

    validateHealth(input: Input) {
      if (!input.health) throw new RequiredError('health');

      if (typeof input.health.neutered === 'undefined')
        throw new RequiredError('neutered in health');
      if (typeof input.health.neutered !== 'boolean')
        throw new EntityValidationError('The neutered is not a boolean');

      if (!input.health.disease_allergy)
        throw new RequiredError('disease_allergy in health');
      if (!(input.health.disease_allergy instanceof Array))
        throw new EntityValidationError('The disease_allergy is not a array');

      if (!input.health.vaccines_medicines)
        throw new RequiredError('vaccines_medicines in health');
      if (!(input.health.vaccines_medicines instanceof Array))
        throw new EntityValidationError(
          'The vaccines_medicines is not a array',
        );

      input.health.disease_allergy.forEach((item) => {
        if (!item.name) throw new RequiredError('name in disease_allergy');
        if (+item.type !== 0 && +item.type !== 1)
          throw new RequiredError('type in disease_allergy');
      });

      input.health.vaccines_medicines.forEach((item) => {
        if (!item.name) throw new RequiredError('name in vaccines_medicines');
        if (item.type !== 0 && item.type !== 1)
          throw new RequiredError('type in vaccines_medicines');
        if (!item.total_dose)
          throw new RequiredError('total_dose in vaccines_medicines');
        if (!item.doses) throw new RequiredError('doses in vaccines_medicines');

        if (!(item.doses instanceof Array))
          throw new EntityValidationError('The doses is not a array');

        if (item.doses.length === 0) {
          throw new RequiredError('At least one dose in vaccines_medicines');
        }

        item.doses.forEach((dose) => {
          if (!dose.application_date)
            throw new RequiredError(`application_date in dose '${item.name}'`);
          if (typeof dose.applied === 'undefined')
            throw new RequiredError(`applied in dose '${item.name}'`);
          if (!dose.number_dose)
            throw new RequiredError(`number_dose in dose '${item.name}'`);
        });
      });
    }

    createHealth(input: Input): Health {
      const health = new Health({
        neutered: input.health.neutered,
        additional: input.health.additional ?? '',
        disease_allergy: input.health.disease_allergy.map(
          (item) =>
            new DiseaseAllergy({
              name: item.name,
              description: item.description,
              type: +item.type,
            }),
        ),
        vaccines_medicines: input.health.vaccines_medicines.map(
          (item) =>
            new VaccineMedicine({
              name: item.name,
              total_dose: item.total_dose,
              type: item.type,
              doses: item.doses.map(
                (dose) =>
                  new Dose({
                    application_date: new Date(dose.application_date),
                    applied: dose.applied,
                    number_dose: dose.number_dose,
                  }),
              ),
            }),
        ),
      });

      return health;
    }
  }

  export type Input = {
    urgent: boolean;
    urgency_justification?: string;
    posted_by: string;

    size_current: number;
    size_estimated: number;
    breed: string;
    name: string;
    sex: number;
    date_birth: string;
    specie: string;
    characteristic: string;
    history: string;
    personalities: string[];

    main_image: string;
    second_image: string;
    third_image: string;
    fourth_image: string;

    health: {
      neutered: boolean;
      vaccines_medicines: {
        name: string;
        type: number;
        doses: {
          number_dose: number;
          application_date: string;
          applied: boolean;
        }[];
        total_dose: number;
      }[];
      disease_allergy: {
        name: string;
        description: string;
        type: string;
      }[];
      additional: string;
    };

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
