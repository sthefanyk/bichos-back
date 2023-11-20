import { DataSource, Repository } from 'typeorm';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { PublishAdoptPost } from 'src/@core/application/use-cases/post/publish-adopt-post.usecase';
import { Post } from 'src/@core/domain/entities/posts/post';
import {
  CheckAndUpdateStatusAdoptPost,
  CheckAndUpdateStatusSponsorshipPost,
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishSponsorshipPost,
} from 'src/@core/application/use-cases/post';
import { FindByIdAdoptPost } from 'src/@core/application/use-cases/post/find-by-id-adopt-post.usecase';
import { FindByIdSponsorshipPost } from 'src/@core/application/use-cases/post/find-by-id-sponsorship-post.usecase';
import { PostInactivate } from 'src/@core/application/use-cases/post/inactivate-adopt-post.usecase';
import { Personality } from 'src/@core/domain/entities/personality';
import { Need } from 'src/@core/domain/entities/need';
import { AnimalAdopt } from 'src/@core/domain/entities/posts/animal-adopt';
import { AnimalSponsorship } from 'src/@core/domain/entities/posts/animal-sponsorship';
import { City } from 'src/@core/domain/entities/localization/city';
import { State } from 'src/@core/domain/entities/localization/state';
import { Health } from 'src/@core/domain/entities/health/health';
import { DiseaseAllergy } from 'src/@core/domain/entities/health/disease-allergy';
import { VaccineMedicine } from 'src/@core/domain/entities/health/vaccine-medicine';
import { Dose } from 'src/@core/domain/entities/health/dose';
import { Contact } from 'src/@core/domain/entities/contact';
import {
  AnimalAdoptModel,
  AnimalHasNeedModel,
  AnimalHasPersonalityModel,
  AnimalModel,
  AnimalSponsorshipModel,
  DiseaseAllergyModel,
  DoseModel,
  HealthModel,
  NeedModel,
  PersonalityModel,
  PostModel,
  UserModel,
  VaccineMedicineModel,
} from 'src/@core/domain/models';

export class PostTypeormRepository implements IPostRepository {
  private postRepo: Repository<PostModel>;
  private userRepo: Repository<UserModel>;
  private animalRepo: Repository<AnimalModel>;
  private animalAdoptRepo: Repository<AnimalAdoptModel>;
  private animalSponsorshipRepo: Repository<AnimalSponsorshipModel>;
  private animalHasPersonalityRepo: Repository<AnimalHasPersonalityModel>;
  private animalHasNeedRepo: Repository<AnimalHasNeedModel>;
  private personalityRepo: Repository<PersonalityModel>;
  private needRepo: Repository<NeedModel>;
  private healthRepo: Repository<HealthModel>;
  private diseaseAllergyRepo: Repository<DiseaseAllergyModel>;
  private vaccineMedicineRepo: Repository<VaccineMedicineModel>;
  private doseRepo: Repository<DoseModel>;

  constructor(private dataSource: DataSource) {
    this.postRepo = this.dataSource.getRepository(PostModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
    this.animalRepo = this.dataSource.getRepository(AnimalModel);
    this.animalAdoptRepo = this.dataSource.getRepository(AnimalAdoptModel);
    this.animalSponsorshipRepo = this.dataSource.getRepository(
      AnimalSponsorshipModel,
    );
    this.animalHasPersonalityRepo = this.dataSource.getRepository(
      AnimalHasPersonalityModel,
    );
    this.animalHasNeedRepo = this.dataSource.getRepository(AnimalHasNeedModel);
    this.personalityRepo = this.dataSource.getRepository(PersonalityModel);
    this.needRepo = this.dataSource.getRepository(NeedModel);
    this.healthRepo = this.dataSource.getRepository(HealthModel);
    this.diseaseAllergyRepo =
      this.dataSource.getRepository(DiseaseAllergyModel);
    this.vaccineMedicineRepo =
      this.dataSource.getRepository(VaccineMedicineModel);
    this.doseRepo = this.dataSource.getRepository(DoseModel);
  }

  async updateStatusAdoptPost(
    entities: Post[],
  ): CheckAndUpdateStatusAdoptPost.Output {
    for (const entity of entities) {
      const animal: AnimalAdopt = entity.animal as any;
      await this.animalAdoptRepo.update(animal.id, {
        status: animal.status,
        update_status_at: animal.update_status_at,
      });
    }
  }

  async updateStatusSponsorshipPost(
    entities: Post[],
  ): CheckAndUpdateStatusSponsorshipPost.Output {
    for (const entity of entities) {
      const animal: AnimalSponsorship = entity.animal as any;
      await this.animalSponsorshipRepo.update(animal.id, {
        status: animal.status,
        update_status_at: animal.update_status_at,
      });
    }
  }

  async findByIdPost(id: string): Promise<PostModel> {
    return this.postRepo.findOne({ where: { id } });
  }

  async inactivate(entity: Post): PostInactivate.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const result = await this.postRepo.update(entity.id, {
      ...entity.toJson(),
      posted_by: user,
      animal: entity.animal.toJson(),
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

    if (result.affected === 0) return null;

    return {
      id: entity.id,
      type: entity.type,
    };
  }

  async findByIdSponsorshipPost(id: string): FindByIdSponsorshipPost.Output {
    return this._get(id);
  }

  async publishAdoptPost(entity: Post): PublishAdoptPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const animal = await this.animalRepo.save(entity.animal.toJson());

    const post = await this.postRepo.save({
      ...entity.toJson(),
      posted_by: user,
      animal,
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

    await this.addPersonalities(entity.animal.personalities, animal.id);

    const health = (entity.animal as any).health;

    const healthModel = await this.healthRepo.save({
      id_animal: animal.id,
      additional: health.additional,
      neutered: health.neutered,
    });

    for (const disease_allergy of health.disease_allergy) {
      await this.diseaseAllergyRepo.save({
        id_animal: animal.id,
        name: disease_allergy.name,
        description: disease_allergy.description,
        type: disease_allergy.type,
        health: healthModel,
      });
    }

    for (const vaccines_medicines of health.vaccines_medicines) {
      const vm = await this.vaccineMedicineRepo.save({
        id: vaccines_medicines.id,
        id_animal: animal.id,
        name: vaccines_medicines.name,
        type: vaccines_medicines.type,
        total_dose: vaccines_medicines.total_dose,
        health: healthModel,
      });

      for (const dose of vaccines_medicines.doses) {
        await this.doseRepo.save({
          id: dose.id,
          id_vaccine_medicine: vm.id,
          application_date: dose.application_date,
          applied: dose.applied,
          number_dose: dose.number_dose,
          vaccine_medicine: vm,
        });
      }
    }

    const animalAdoptModel: AnimalAdopt = entity.animal.toJson() as any;
    const animalAdopt = await this.animalAdoptRepo.save({
      id: animalAdoptModel.id,
      breed: animalAdoptModel.breed,
      size_current: animalAdoptModel.size_current,
      size_estimated: animalAdoptModel.size_estimated,
      status: animalAdoptModel.status,
      update_status_at: animalAdoptModel.update_status_at,
      health: healthModel,
    });

    if (!post || !animal || !animalAdopt) {
      throw new Error(`Could not save post`);
    }

    return {
      id: post.id,
    };
  }

  async publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const animalSponsorshipModel: AnimalSponsorship =
      entity.animal.toJson() as any;

    const animal = await this.animalRepo.save(entity.animal.toJson());
    const animalSponsorship = await this.animalSponsorshipRepo.save({
      id: animalSponsorshipModel.id,
      accompany: animalSponsorshipModel.accompany,
      reason_request: animalSponsorshipModel.reason_request,
      status: animalSponsorshipModel.status,
      update_status_at: animalSponsorshipModel.update_status_at,
    });
    const post = await this.postRepo.save({
      ...entity.toJson(),
      posted_by: user,
      animal,
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

    if (!post || !animal || !animalSponsorship) return null;

    await this.addPersonalities(entity.animal.personalities, animal.id);
    await this.addNeeds((entity.animal as any).needs, animal.id);

    return {
      id: post.id,
    };
  }

  async findAllAdoptPost(): FindAllAdoptPost.Output {
    return this._getAll(0);
  }

  async findAllSponsorshipPost(): FindAllSponsorshipPost.Output {
    return this._getAll(1);
  }

  async findByIdAdoptPost(id: string): FindByIdAdoptPost.Output {
    return this._get(id);
  }

  async _get(id: string) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['contact_city', 'contact_city.state', 'animal', 'posted_by'],
    });

    if (!post) return null;
    return this._getPost(post);
  }

  async _getAll(type: number) {
    const posts = await this.postRepo.find({
      where: { type },
      relations: ['contact_city', 'contact_city.state', 'animal', 'posted_by'],
    });

    return await Promise.all(
      posts.map(async (post) => await this._getPost(post)),
    );
  }

  async _getPost(post: PostModel) {
    const personalities = await this.getPersonalities(post.animal.id);

    let animal;

    if (+post.type === 0) {
      const animal_adopt = await this.animalAdoptRepo.findOne({
        where: { animal: post.animal },
        relations: [
          'health',
          'health.disease_allergy',
          'health.vaccines_medicines',
          'health.vaccines_medicines',
          'health.vaccines_medicines.doses',
        ],
      });

      if (!animal_adopt) return null;

      animal = new AnimalAdopt(
        {
          size_current: +animal_adopt.size_current,
          size_estimated: +animal_adopt.size_estimated,
          status: +animal_adopt.status,
          update_status_at: animal_adopt.update_status_at,
          health: new Health({
            ...animal_adopt.health,
            disease_allergy: animal_adopt.health.disease_allergy.map(
              (item) => new DiseaseAllergy({ ...item, type: +item.type }),
            ),
            vaccines_medicines: animal_adopt.health.vaccines_medicines.map(
              (item) =>
                new VaccineMedicine({
                  ...item,
                  type: +item.type,
                  doses: item.doses.map((item) => new Dose(item)),
                }),
            ),
          }),
          breed: animal_adopt.breed,
        },
        {
          ...post.animal,
          sex: +post.animal.sex,
          species: +post.animal.species,
          personalities,
        },
      );
    } else if (+post.type === 1) {
      const animal_sponsorship = await this.animalSponsorshipRepo.findOne({
        where: { id: post.animal.id },
      });

      const needs = await this.getNeeds(post.animal.id);

      animal = new AnimalSponsorship(
        {
          ...animal_sponsorship,
          needs,
        },
        {
          ...post.animal,
          sex: +post.animal.sex,
          species: +post.animal.species,
          personalities,
        },
      );
    }

    return new Post({
      ...post,
      posted_by: post.posted_by.id,
      contact: new Contact({
        name: post.contact_name,
        email: post.contact_email,
        phone: post.contact_phone,
        city: new City({
          name: post.contact_city.name,
          state: new State({
            ...post.contact_city.state,
          }),
        }),
      }),
      type: +post.type,
      animal,
    });
  }

  async getPersonalities(idAnimal: string): Promise<Personality[]> {
    const animalHasPersonality = await this.animalHasPersonalityRepo.find({
      where: { id_animal: idAnimal },
    });

    const personalities: Personality[] = [];

    for (const personality of animalHasPersonality) {
      const foundPersonality = await this.personalityRepo.findOne({
        where: { id: personality.id_personality },
      });
      personalities.push(new Personality(foundPersonality));
    }

    return personalities;
  }

  async addPersonalities(personalities: Personality[], animalId: string) {
    for (const personality of personalities) {
      await this.animalHasPersonalityRepo.save({
        id_animal: animalId,
        id_personality: personality.id,
      });
    }
  }

  async getNeeds(idAnimal: string): Promise<Need[]> {
    const animalHasNeed = await this.animalHasNeedRepo.find({
      where: { id_animal: idAnimal },
    });

    const needs: Need[] = [];

    for (const need of animalHasNeed) {
      const foundNeed = await this.needRepo.findOne({
        where: { id: need.id_need },
      });
      needs.push(new Need(foundNeed));
    }

    return needs;
  }

  async addNeeds(needs: Need[], animalId: string) {
    for (const need of needs) {
      await this.animalHasNeedRepo.save({
        id_animal: animalId,
        id_need: need.id,
      });
    }
  }
}
